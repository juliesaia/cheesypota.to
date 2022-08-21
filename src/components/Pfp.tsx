import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import confetti from "canvas-confetti";

const Pfp: Component<{ canvas: HTMLCanvasElement }> = (props) => {
  const [hovered, setHovered] = createSignal(false);
  const [clicked, setClicked] = createSignal(false);

  let customConfetti = confetti.create(props.canvas, {
    resize: true,
  });

  return (
    <button
      max-w-120
      mx-12
      my-10
      rounded-full
      transform
      transition-transform
      overflow-hidden
      classList={{ "scale-90": hovered() || clicked() }}
      onMouseOver={() => {
        setHovered(true);
        setTimeout(() => {
          setHovered(false);
        }, 150);
      }}
      onMouseLeave={() => setHovered(false)}
      onPointerDown={() => setClicked(true)}
      onPointerUp={() => {
        setClicked(false);
        customConfetti(
          {
            disableForReducedMotion: true,
            colors: ["#55CDFC", "#FFFFFF", "#F7A8B8"],
            ticks: 100,
            spread: 30,
            startVelocity: 30,
            angle: 135,
            origin: { x: 0.35, y: 0.45 },
          },
          {
            resize: true,
            useWorker: true,
          }
        );
        customConfetti({
          disableForReducedMotion: true,
          colors: ["#55CDFC", "#FFFFFF", "#F7A8B8"],
          ticks: 100,
          spread: 30,
          startVelocity: 30,
          angle: 45,
          origin: { x: 0.65, y: 0.45 },
        });
      }}
      aria-label="Confetti button easter egg"
    >
      <img
        alt="Profile picture"
        src="pfp_resize.webp"
        draggable={false}
        width="480"
        height="384"
      />
    </button>
  );
};

export default Pfp;
