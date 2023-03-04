import type { Component } from "solid-js";
import Pfp from "./Pfp";
const Home: Component<{}> = (props) => {
  let canvas: HTMLCanvasElement;

  return (
    <div flex flex-col>
      <canvas
        ref={canvas}
        position-absolute
        h-full
        w-full
        pointer-events-none
        z-10000
      ></canvas>
      <div flex items-center flex-grow flex-col>
        <span text-green-300 text-4xl font-bold mt-8 text-center>
          Hi, I'm Julie Saia! 😁
        </span>
        <Pfp canvas={canvas}></Pfp>
        <span text-green-300 text-2xl font-bold mt-8 px-12 text-center>
          I'm a full-stack web developer based in Ann Arbor, MI.
        </span>
        <div mt-8 flex justify-center text-white>
          <a
            href="https://github.com/juliesaia"
            link
            border-green-500
            hover:bg-green-300
          >
            <span>Github</span>
            <div i-akar-icons-github-fill text-3xl ml-2 />
          </a>

          <a
            href="https://www.linkedin.com/in/julie-s-bb9624202/"
            link
            border-blue-500
            hover:bg-blue-300
          >
            <span>LinkedIn</span>
            <div i-akar-icons-linkedin-box-fill text-2xl ml-2 />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
