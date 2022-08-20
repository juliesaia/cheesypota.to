import {
  Component,
  JSXElement,
  For,
  onMount,
  Show,
  createEffect,
} from "solid-js";
import ProjectCard from "./ProjectCard";

import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";

const ResizePlugin = (slider) => {
  const observer = new ResizeObserver(function () {
    slider.update();
  });

  slider.on("created", () => {
    observer.observe(slider.container);
  });
  slider.on("destroyed", () => {
    observer.unobserve(slider.container);
  });
};

const Projects: Component<{}> = (props) => {
  let container: HTMLDivElement;
  let slider;
  onMount(() => {
    slider = new KeenSlider(
      container,
      {
        slides: {
          origin: "center",
          perView: 1.5,
          spacing: 50,
        },
      },
      [ResizePlugin]
    );
  });

  const projects: JSXElement[] = [
    <ProjectCard
      title="This website!"
      screenshot={{ name: "screenshot1.webp", width: 500, height: 431 }}
      built_with={[
        {
          logo: "i-logos-solidjs-icon",
          name: "Solid.js",
        },
        {
          logo: "i-logos-unocss",
          name: "UnoCSS",
        },
      ]}
      description={`I used this portfolio as an opportunity to learn some cutting edge web
      technologies! Solid.js is one of the most performant frontend
      frameworks, released in 2021. UnoCSS is an extremely performant take
      on TailwindCSS, also released in 2021.`}
      date="July 2022"
      source_url="https://github.com/juliesaia"
    />,
    <ProjectCard
      title="Rivals of Aether Stream App"
      screenshot={{ name: "screenshot2.webp", width: 500, height: 265 }}
      built_with={[
        {
          logo: "i-logos-electron",
          name: "Electron",
        },
        {
          logo: "i-logos-vue",
          name: "Vue 3",
        },
        {
          logo: "i-vscode-icons-file-type-windi",
          name: "WindiCSS",
        },
      ]}
      description={`This is an Electron app made to manage a stream overlay for the
      fighting game Rivals of Aether. Made for the tournament Sunnyshore,
      which I won!`}
      date="May 2022"
      source_url="https://github.com/juliesaia"
    />,
    <ProjectCard
      title="Julie's Ladder"
      screenshot={{ name: "screenshot3.webp", width: 500, height: 281 }}
      built_with={[
        {
          logo: "i-logos-vue",
          name: "Vue 3",
        },
        {
          logo: "i-vscode-icons-file-type-windi",
          name: "WindiCSS",
        },
      ]}
      description={`A matchmaking service for Rivals of Aether, complete with a chat
      system and Steam login integration.`}
      date="September 2021"
      source_url="https://github.com/juliesaia"
    />,
  ];

  return (
    <>
      <div pb-60 pt-20 text-green-300 flex flex-col items-center>
        <div text-center text-4xl font-bold>
          Projects
        </div>
        <div text-2xl mt-8 text-center px-4>
          I'm most proficient with React and Vue, but I love using cutting edge
          libraries in my projects!
        </div>

        <div lt-md:display-none text-2xl mt-8 text-center px-4>
          Hover the cards to learn more:
        </div>

        <div md:display-none text-2xl mt-8 text-center px-4>
          Tap the cards to learn more:
        </div>

        <div lt-md:display-none mt-10 grid grid-cols-3>
          <For each={projects}>
            {(el, i) => (
              <div mx-8 class="children:hover:rotate-y-180" max-w-80>
                <div
                  h-full
                  children:bg-dark-800
                  children:rounded-xl
                  children:shadow-xl
                  text-center
                  transition-transform-500
                  children:backface-hidden
                  style="transform-style: preserve-3d;"
                  // dark magic to get elements to overlap without position-absolute
                  grid
                  grid-cols-1
                  grid-rows-1
                  children:col-start-1
                  children:row-start-1
                >
                  {el}
                </div>
              </div>
            )}
          </For>
        </div>

        <div md:display-none mt-10 max-w-200>
          <div
            ref={container}
            class="keen-slider"
            style="width: 100vw !important;"
          >
            <For each={projects}>
              {(el, i) => (
                <div
                  classList={{
                    "col-start-2": i() === 0,
                    // [`number-slide${i()}`]: true,
                  }}
                  class="children:hover:rotate-y-180 keen-slider__slide"
                >
                  <div
                    h-full
                    children:bg-dark-800
                    children:rounded-xl
                    children:shadow-xl
                    text-center
                    transition-transform-500
                    children:backface-hidden
                    style="transform-style: preserve-3d;"
                    // dark magic to get elements to overlap without position-absolute
                    grid
                    grid-cols-1
                    grid-rows-1
                    children:col-start-1
                    children:row-start-1
                  >
                    {el}
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
