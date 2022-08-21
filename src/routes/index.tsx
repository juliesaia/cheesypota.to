import Home from "~/components/Home";
import Projects from "~/components/Projects";
import About from "~/components/About";
import Fade from "~/components/Fade";
import Contact from "~/components/Contact";
import { Title } from "solid-start";

import { Component, createSignal, For, onMount } from "solid-js";

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
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    setup_observers();
  });

  const [showSidebar, setShowSidebar] = createSignal(null);

  return (
    <>
      <Title>Julie Saia</Title>
      <button
        md:display-none
        position-fixed
        text-white
        text-4xl
        top-4
        left-4
        i-icon-park-outline-hamburger-button
        z-10000
        onClick={() => setShowSidebar(!showSidebar())}
        aria-label="Open sidebar"
      ></button>
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
              hover:bg-dark-700
              h-full
              flex
              items-center
              p-6
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

      <aside
        md:display-none
        ref={navbar}
        h-screen
        bg-dark-900
        text-white
        flex
        flex-col
        position-fixed
        w="75%"
        top-0
        z-1000
        pt-16
        translate-x--full
        transition-transform-500
        classList={{
          "opacity-0": showSidebar() === null,
          "translate-x--100vw ": !showSidebar(),
          "translate-x-none  ": showSidebar(),
        }}
      >
        <For each={tabs}>
          {(el, i) => (
            <a
              href="/"
              transition-colors
              hover:bg-dark-700
              flex
              items-center
              p-6
              classList={{ "bg-dark-800": selectedIndex() === i() }}
              onClick={() => {
                if (i() == 0) window.scrollTo(0, 0);
                else tab_refs[i()].scrollIntoView();
                setShowSidebar(false);
              }}
            >
              {el}
            </a>
          )}
        </For>
      </aside>

      <main
        md:min-h={`[calc(100vh_-_${navbarHeight}px)]`}
        lt-md:min-h-screen
        lt-md:pt-12
        bg-dark-800
        ref={tab_refs[0]}
        scroll-mb-16
        overflow-hidden
      >
        <Home />
      </main>
      <section
        md:min-h={`[calc(100vh_-_${navbarHeight}px)]`}
        lt-md:min-h-screen
        bg-dark-500
        ref={tab_refs[1]}
        scroll-mb-16
        overflow-hidden
      >
        <Fade direction="right">
          <Projects />
        </Fade>
      </section>
      <section
        md:min-h={`[calc(100vh_-_${navbarHeight}px)]`}
        lt-md:min-h-screen
        bg-dark-800
        ref={tab_refs[2]}
        scroll-mb-16
        overflow-hidden
      >
        <Fade direction="left">
          <About />
        </Fade>
      </section>
      <section
        md:min-h={`[calc(100vh_-_${navbarHeight}px)]`}
        lt-md:min-h-screen
        bg-dark-500
        ref={tab_refs[3]}
        scroll-mb-16
        overflow-hidden
      >
        <Fade direction="right">
          <Contact />
        </Fade>
      </section>
    </>
  );
};

export default Index;
