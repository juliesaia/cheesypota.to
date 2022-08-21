import {
  Component,
  children,
  JSXElement,
  createSignal,
  onMount,
} from "solid-js";

const Fade: Component<{
  children: JSXElement;
  direction: "left" | "right";
}> = (props) => {
  const c = children(() => props.children);
  let container: HTMLDivElement;
  let fired = false;
  const [shown, setShown] = createSignal(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let entry = entries[0];
        if (fired) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(container);
          }
        } else {
          fired = true;
        }
      },
      { rootMargin: "-1px" }
    );

    observer.observe(container);
  });
  return (
    <div>
      <div
        transition-all-1500
        transform
        classList={{
          "opacity-100 transform-none": shown(),
          "opacity-0 translate-x-20vw": !shown() && props.direction === "right",
          "opacity-0 translate-x--20vw": !shown() && props.direction === "left",
        }}
        ref={container}
      >
        {c()}
      </div>
    </div>
  );
};

export default Fade;
