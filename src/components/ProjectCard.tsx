import { Component, For } from "solid-js";

const ProjectCard: Component<{
  title: string;
  screenshot: string;
  built_with: { logo: string; name: string }[];
  description: string;
  date: string;
  source_url: string;
}> = (props) => {
  return (
    <>
      <div flex flex-col max-h-100>
        <div p-6>{props.title}</div>
        <div>
          <img
            // max-w-30
            src={props.screenshot}
            alt="Project screenshot"
            draggable={false}
          />
        </div>
        <div flex-grow></div>
        <div my-2>
          Built with:
          <div p-6 flex justify-center>
            <For each={props.built_with}>
              {(el) => (
                <>
                  <div flex flex-col items-center mx-4>
                    <div class={el.logo} text-4xl mb-2 />
                    {el.name}
                  </div>
                </>
              )}
            </For>
          </div>
        </div>
      </div>
      <div rotate-y-180 flex flex-col items-center>
        <div p-6>{props.date}</div>
        <div p-6>{props.description}</div>
        <a href={props.source_url} linkgreen text-white>
          <span>Source Code</span>
          <div i-akar-icons-github-fill text-3xl ml-2 />
        </a>
      </div>
    </>
  );
};

export default ProjectCard;
