import Home from "~/components/Home";
import Projects from "~/components/Projects";
import About from "~/components/About";
import Fade from "~/components/Fade";
import Contact from "~/components/Contact";
import { useGlobal } from "~/components/GlobalProvider";
import { Title } from "solid-start";

import {
  Component,
  createSignal,
  createMemo,
  For,
  Show,
  createEffect,
} from "solid-js";
// import { Title } from "solid-meta";

const Index: Component<{}> = (props) => {
  let navbar: HTMLDivElement;
  // this is too much of a hassle to make dynamic, and its a constant height value anyway
  const navbarHeight = 64;
  const tabs = ["Home", "Projects", "About", "Contact"];
  const tab_refs: HTMLDivElement[] = new Array(tabs.length);

  const [navbarShow, setNavbarShow] = createSignal(false);

  const [selectedIndex, setSelectedIndex] = createSignal(0);

  const global = useGlobal();

  // console.log(global);

  const viewport = createMemo(
    () => `[calc(100vh_-_${global?.isMobile ? 0 : navbarHeight}px)]`
  );

  createEffect(() => {
    // const mobile = navigator.userAgentData.mobile;
    // setIsMobile(mobile);
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // console.log(global?.isMobile);

    if (global?.isMobile === null) {
      return;
    }
    console.log("!global?.isMobile", !global?.isMobile);

    setNavbarShow(!global?.isMobile);

    if (!global?.isMobile) {
      let fired = false;
      let prevY = 0;
      const observer_navbar = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (fired) {
            let st = window.pageYOffset || document.documentElement.scrollTop;

            if (st > prevY) {
              // https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/
              // down
              if (!entry.isIntersecting) {
                setSelectedIndex(selectedIndex() + 1);
              }
              prevY = st <= 0 ? 0 : st;
            } else {
              // up
              if (entry.isIntersecting) setSelectedIndex(selectedIndex() - 1);

              prevY = st <= 0 ? 0 : st;
            }
          } else {
            fired = true;
          }
        },
        { threshold: 0, rootMargin: `${navbarHeight * -1 - 1}px` }
      );

      for (let ref of tab_refs) {
        if (ref) {
          observer_navbar.observe(ref);
        }
      }
    }
  });

  return (
    <>
      <Title>Julie Saia</Title>
      {/* <button onClick={() => console.log(!global?.isMobile)}>debug</button> */}
      <Show when={navbarShow()}>
        <nav
          ref={navbar}
          h={`${navbarHeight / 4}`}
          bg-dark-900
          text-white
          flex
          items-center
          position-sticky
          top-0
          z-1000
        >
          <For each={tabs}>
            {(el, i) => (
              <a
                href="/"
                transition-colors
                ease-in-out
                hover:bg-dark-700
                h-full
                flex
                items-center
                px-6
                my-6
                classList={{ "bg-dark-800": selectedIndex() === i() }}
                onClick={() => {
                  if (i() == 0) window.scrollTo(0, 0);
                  else tab_refs[i()].scrollIntoView();
                }}
              >
                {el}
              </a>
            )}
          </For>
        </nav>
      </Show>
      <div
        min-h={viewport()}
        bg-dark-800
        ref={tab_refs[0]}
        scroll-mb-16
        overflow-hidden
      >
        <Home />
      </div>
      <div
        min-h={viewport()}
        bg-dark-500
        ref={tab_refs[1]}
        scroll-mb-16
        overflow-hidden
      >
        <Fade direction="right">
          <Projects />
        </Fade>
      </div>
      <div
        min-h={viewport()}
        bg-dark-800
        ref={tab_refs[2]}
        scroll-mb-16
        overflow-hidden
      >
        <Fade direction="left">
          <About />
        </Fade>
      </div>
      <div
        min-h={viewport()}
        bg-dark-500
        ref={tab_refs[3]}
        scroll-mb-16
        overflow-hidden
      >
        <Fade direction="right">
          <Contact />
        </Fade>
      </div>
    </>
  );
};

export default Index;
