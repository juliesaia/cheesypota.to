import { Component, For } from "solid-js";

const ProjectCard: Component<{
  title: string;
  screenshot: { name: string; width: number; height: number };
  built_with: { logo: string; name: string }[];
  description: string;
  date: string;
  source_url: string;
}> = (props) => {
  return (
    <>
      <div flex flex-col>
        <div p-6>{props.title}</div>
        <div>
          <img
            width={props.screenshot.width}
            height={props.screenshot.height}
            src={props.screenshot.name}
            alt="Project screenshot"
            draggable={false}
          />
        </div>
        <div flex-grow></div>
        <div my-2>
          Built with:
          <div p-6 flex justify-center>
            <For each={props.built_with}>
              {(library) => (
                <div flex flex-col items-center mx-4>
                  <div class={library.logo} text-4xl mb-2 />
                  {library.name}
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
      <div rotate-y-180 flex flex-col items-center>
        <div p-6>{props.date}</div>
        <div p-6>{props.description}</div>
        <a
          href={props.source_url}
          link
          border-green-500
          hover:bg-green-300
          text-white
        >
          <span>Source Code</span>
          <div i-akar-icons-github-fill text-3xl ml-2 />
        </a>
      </div>
    </>
  );
};

export default ProjectCard;
