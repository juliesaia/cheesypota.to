// todo: sort?
// todo: checklist?
// todo: save as json

import { Title } from "solid-start";

import {
  batch,
  Component,
  createSignal,
  For,
  Show,
  createEffect,
} from "solid-js";
import { createStore } from "solid-js/store";

const minecraft: Component<{}> = (props) => {
  const [itemInput, setItemInput] = createSignal("");
  const [items, setItems] = createStore([
    { item: "cobblestone", opened: false, num: null },
    { item: "furnace", opened: false, num: null },
  ]);
  const [recipes, setRecipes] = createStore([
    { item: "cobblestone", ingredients: [{ item: "furnace", num: 0 }] },
    { item: "furnace", ingredients: [{ item: "cobblestone", num: 8 }] },
  ]);
  const [toCraft, setToCraft] = createSignal("");
  const [craftNum, setCraftNum] = createSignal(1);
  const [units, setUnits] = createSignal(1);

  createEffect(() => {
    if (toCraft() != "") {
      handleRecipe(toCraft(), craftNum(), units());
    }
  });

  function format(num: number, word: string) {
    if (word === "stack") {
      if (num == 64) {
        return `= 1 stack`;
      }
      if (num > 64) {
        return `= ${num / 64} stacks`;
      }
    }
    if (word === "inventory") {
      if (num == 64 * 27) {
        return `= 1 inventory`;
      }
      if (num > 64 * 27) {
        return `= ${num / 64 / 27} inventories`;
      }
    }
    return "";
  }

  function removeItem(itemRemoved: string) {
    for (let recipe of recipes) {
      setRecipes(
        (el) => el.item === recipe.item,
        "ingredients",
        (prev) => prev.filter((el) => el.item != itemRemoved)
      );
    }
    setRecipes(recipes.filter((el) => el.item != itemRemoved));
    setItems(items.filter((el) => el.item != itemRemoved));
    if (toCraft() == itemRemoved) {
      setToCraft("");
      resetNums();
    }
  }

  function resetNums() {
    for (let item of items) {
      setItems((el) => el.item === item.item, "num", null);
    }
  }

  function handleRecipe(root_item: string, root_mult: number, units: number) {
    for (let item of items) {
      setItems((el) => el.item === item.item, "num", 0);
    }

    setItems((el) => el.item === root_item, "num", root_mult * units);

    // id rather die than do dp
    function recurse(item: string, mult: number) {
      if (mult == 0) {
        return;
      }
      let recipe = recipes.find((el) => el.item === item);
      if (!recipe) return;
      for (let ingredient of recipe.ingredients) {
        setItems(
          (el) => el.item == ingredient.item,
          "num",
          (prev) => prev + mult * ingredient.num
        );

        recurse(ingredient.item, mult * ingredient.num);
      }
    }
    recurse(root_item, root_mult * units);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (itemInput() == "" || items.find((el) => el.item === itemInput())) {
      return;
    }
    batch(() => {
      setItems([...items, { item: itemInput(), opened: false, num: null }]);
      setRecipes([
        ...recipes,
        {
          item: itemInput(),
          ingredients: items.map((el) => ({ item: el.item, num: 0 })),
        },
      ]);
      for (let el of items) {
        setRecipes(
          (i) => i.item === el.item,
          "ingredients",
          (prev) => [...prev, { item: itemInput(), num: 0 }]
        );
      }
      setItemInput("");
    });
  }

  return (
    <div
      flex
      flex-col
      //@ts-ignore
      items-center
      text-center
    >
      <Title>Minecraft Crafting Calculator</Title>
      <div text-6xl my-8>
        Minecraft Crafting Calculator
      </div>
      <div>1. Add all relevant items</div>
      <div>2. Edit each item's recipe by clicking</div>
      <div>3. Check the craft checkbox for the desired item</div>

      <form onsubmit={handleSubmit}>
        <input
          onInput={(e) => setItemInput(e.currentTarget.value)}
          value={itemInput()}
          type-text
          //@ts-ignore
          mt-10
          mb-5
          h-fit
          border
          border-color-black
          rounded-md
          //@ts-ignore
          pl-2
          w-42
          placeholder="Item..."
        />
      </form>

      <div w-fit>
        <For each={items}>
          {(el_outer, i) => (
            <div
              border
              border-color-black
              mb--1px
              transition-colors
              classList={{
                "bg-green": toCraft() == el_outer.item,
                "bg-blue":
                  recipes
                    .find((el) => el.item == el_outer.item)
                    ?.ingredients.map((el) => el.num)
                    .reduce((a, b) => a + b, 0) == 0,
              }}
              //@ts-ignore
              relative
            >
              <div
                onClick={() => removeItem(el_outer.item)}
                //@ts-ignore
                absolute
                right-0
                transition-colors
                hover:bg-red
                cursor-pointer
                style="border-radius: 0 0 0.25rem 0.25rem"
              >
                <div i-mdi-close text-3xl />
              </div>
              <div
                onClick={() => setItems([i()], "opened", (opened) => !opened)}
                //@ts-ignore
                px-16
                py-4
                w-80
                h-fit
                flex
                justify-center
                hover:bg-gray-300
                cursor-pointer
                transition-colors
              >
                {el_outer.item}: {el_outer.num} {format(el_outer.num, "stack")}{" "}
                {format(el_outer.num, "inventory")}
              </div>
              <div
                class={
                  items[i()].opened
                    ? "h-80 overflow-scroll"
                    : "h-0 overflow-hidden"
                }
                transition-all
                flex
                flex-col
                items-center
              >
                <div underline mb-4>
                  Recipe
                </div>

                <For each={items}>
                  {(el_inner, i) => (
                    <Show when={el_inner != el_outer}>
                      <div flex w-full mb-4>
                        <div flex-grow flex justify-center>
                          {el_inner.item}
                        </div>
                        <input
                          border
                          border-color-black
                          rounded-md
                          w-12
                          mr-6
                          pl-2
                          type="number"
                          min="0"
                          onInput={(e) => {
                            if (e.currentTarget.value != "") {
                              setRecipes(
                                (recipe) => recipe.item === el_outer.item,
                                "ingredients",
                                (ingredient) =>
                                  ingredient.item === el_inner.item,
                                "num",
                                parseFloat(e.currentTarget.value)
                              );
                            }
                          }}
                          value={
                            recipes
                              .find((el) => el.item === el_outer.item)
                              ?.ingredients.find(
                                (el) => el.item === el_inner.item
                              )?.num
                          }
                        />
                      </div>
                    </Show>
                  )}
                </For>

                <div flex>
                  <label mb-4>
                    {" "}
                    Craft?
                    <input
                      onInput={() => {
                        if (toCraft() === el_outer.item) {
                          setToCraft("");
                          resetNums();
                        } else {
                          setToCraft(el_outer.item);
                        }
                      }}
                      checked={toCraft() === el_outer.item}
                      ml-4
                      type="checkbox"
                    ></input>
                  </label>
                </div>

                <Show when={toCraft() === el_outer.item}>
                  <div flex flex-col items-center>
                    <div flex w-full mb-4>
                      <div flex-grow flex justify-center>
                        How many to craft:
                      </div>
                      <input
                        onInput={(e) => {
                          if (e.currentTarget.value != "") {
                            setCraftNum(parseFloat(e.currentTarget.value));
                          }
                        }}
                        value={craftNum()}
                        border
                        border-color-black
                        rounded-md
                        w-12
                        mr-6
                        pl-2
                        min="0"
                        type="number"
                      />
                    </div>
                    <div>Units:</div>
                    <div flex justify-between>
                      <label>
                        Raw
                        <input
                          onInput={() => setUnits(1)}
                          ml-1
                          type="radio"
                          name="units"
                          checked
                        />
                      </label>
                      <label px-2>
                        Stacks
                        <input
                          onInput={() => setUnits(1 * 64)}
                          ml-1
                          type="radio"
                          name="units"
                        />
                      </label>
                      <label>
                        Inventories
                        <input
                          onInput={() => setUnits(1 * 64 * 27)}
                          ml-1
                          type="radio"
                          name="units"
                        />
                      </label>
                    </div>
                  </div>
                </Show>
              </div>
            </div>
          )}
        </For>
      </div>
      <div h-40></div>
    </div>
  );
};

export default minecraft;
