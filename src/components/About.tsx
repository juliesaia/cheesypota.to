import { Component } from "solid-js";

const About: Component<{}> = (props) => {
  return (
    <div pb-60 pt-20 text-green-300>
      <div text-center text-4xl font-bold mb-20>
        About
      </div>
      <div text-2xl mt-8 flex items-center lt-lg:flex-col justify-evenly mx-12>
        <div text-center max-w-120 pb-20 px-4>
          My name's Julie! I'm a fullstack web developer currently finishing my
          Bachelor's degree at the University of Michigan.
        </div>
        <div flex-grow max-w-200 w-full>
          {/* <div text-center>Skills</div> */}
          <div
            bg-dark-300
            border
            border-width-2
            rounded-xl
            shadow-xl
            overflow-hidden
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-4
            xl:grid-cols-5
            children:text-black
            children:w-full
            whitespace-nowrap
            class="first:children:children:(text-5xl flex mx-auto my-6) last:children:children:(bg-green text-center)"
          >
            <div>
              <div i-logos-react />
              <div>React.js</div>
            </div>
            <div>
              <div i-logos-vue />
              <div>Vue.js</div>
            </div>
            <div>
              <div i-logos-solidjs-icon />
              <div>Solid.js</div>
            </div>
            <div>
              <div text-blue i-mdi-jquery />
              <div>jQuery</div>
            </div>
            <div>
              <div text-dark-700 i-simple-icons-unocss />
              <div>UnoCSS</div>
            </div>
            <div>
              <div i-vscode-icons-file-type-windi />
              <div>WindiCSS</div>
            </div>
            <div>
              <div i-logos-javascript />
              <div>JavaScript</div>
            </div>
            <div>
              <div i-logos-typescript-icon />
              <div>TypeScript</div>
            </div>
            <div>
              <div i-logos-python />
              <div>Python</div>
            </div>
            <div>
              <div i-logos-c-plusplus />
              <div>C++</div>
            </div>
            <div>
              <div i-logos-nodejs-icon />
              <div>NodeJS</div>
            </div>
            <div>
              <div i-logos-django-icon />
              <div>Django</div>
            </div>
            <div>
              <div i-logos-git-icon />
              <div>Git</div>
            </div>
            <div>
              <div i-logos-docker-icon />
              <div>Docker</div>
            </div>
            <div
              col-span-2
              sm:col-span-1
              md:col-span-2
              lg:col-span-2
              xl:col-span-1
            >
              <div i-ion-ellipsis-horizontal />
              <div>More to come...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
