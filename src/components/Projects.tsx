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

const Projects: Component<{}> = (props) => {
  let container: HTMLDivElement;

  createEffect(() => {
    if (container)
      var slider = new KeenSlider(
        container,
        {
          loop: true,
          created: () => {
            console.log("created");
          },
        },
        [
          // add plugins here
        ]
      );
  });

  const projects: JSXElement[] = [
    <ProjectCard
      title="This website!"
      screenshot="screenshot1.webp"
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
      screenshot="screenshot2.webp"
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
      screenshot="screenshot3.webp"
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

        <div grid grid-cols-5 mt-10>
          <For each={projects}>
            {(el, i) => (
              <div
                mx-8
                classList={{ "col-start-2": i() === 0 }}
                class="children:hover:rotate-y-180"
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

        <div mt-10 max-w-200 ref={container}>
          <div>
            <For each={projects}>
              {(el, i) => (
                <div
                  mx-8
                  classList={{ "col-start-2": i() === 0 }}
                  class="children:hover:rotate-y-180 glide__slide"
                >
                  <div
                    h-full
                    children:bg-dark-500
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
