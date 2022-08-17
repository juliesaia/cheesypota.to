import Home from "~/components/Home";
import Projects from "~/components/Projects";
import About from "~/components/About";
import Fade from "~/components/Fade";
import Contact from "~/components/Contact";
import { Title } from "solid-start";

import {
  Component,
  createSignal,
  createMemo,
  For,
  Show,
  createEffect,
  onMount,
} from "solid-js";
// import { Title } from "solid-meta";

const Index: Component<{}> = (props) => {
  let navbar: HTMLDivElement;
  // this is too much of a hassle to make dynamic, and its a constant height value anyway
  const navbarHeight = 64;
  const tabs = ["Home", "Projects", "About", "Contact"];
  const tab_refs: HTMLDivElement[] = new Array(tabs.length);

  const [selectedIndex, setSelectedIndex] = createSignal(0);

  let observer_navbar: IntersectionObserver;

  function setup_observers() {
    let fired = false;
    let prevY = 0;

    observer_navbar = new IntersectionObserver(
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
          } else if (st < prevY) {
            // up
            if (entry.isIntersecting) setSelectedIndex(selectedIndex() - 1);

            prevY = st <= 0 ? 0 : st;
          }
        } else {
          fired = true;
        }
      },
      { threshold: 0, rootMargin: `${navbarHeight * -1 - 1}px 0px 0px 0px` }
    );

    for (let ref of tab_refs) {
      if (ref) {
        observer_navbar.observe(ref);
      }
    }
  }

  onMount(() => {
    // const mobile = navigator.userAgentData.mobile;
    // setIsMobile(mobile);
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    if (window.matchMedia("(min-width: 768px)").matches) {
      setup_observers();
    }

    window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
      if (e.matches) {
        setup_observers();
      } else {
        if (observer_navbar) {
          for (let ref of tab_refs) {
            if (ref) {
              observer_navbar.unobserve(ref);
            }
          }
        }
      }
    });
  });

  return (
    <>
      <Title>Julie Saia</Title>

      <nav
        lt-md:display-none
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

      <div
        lt-md:min-h={`[calc(100vh_-_${navbarHeight}`}
        min-h-screen
        bg-dark-800
        ref={tab_refs[0]}
        scroll-mb-16
        overflow-hidden
      >
        <Home />
      </div>
      <div
        lt-md:min-h={`[calc(100vh_-_${navbarHeight}`}
        min-h-screen
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
        lt-md:min-h={`[calc(100vh_-_${navbarHeight}`}
        min-h-screen
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
        lt-md:min-h={`[calc(100vh_-_${navbarHeight}`}
        min-h-screen
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
