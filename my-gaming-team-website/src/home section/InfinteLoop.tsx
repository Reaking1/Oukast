// InfiniteLoop.tsx
import  { useEffect, useRef } from "react";
import gsap from "gsap";

import Delta from "../../public/assets/DELTA2.jpeg";
import Apex1 from "../../public/assets/APEX.jpg";
import Zen from "../../public/assets/ZEN4.jpg";
import heroImg from "../../public/assets/ZEN2.jpeg";

const backgroundImages = [heroImg, Delta, Apex1, Zen];

export default function InfiniteLoop() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    gsap.to(el, {
      xPercent: -50,
      duration: 40,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
    <div className="relative h-[60vh] w-full overflow-hidden text-white">
      {/* Scrolling image container */}
      <div
        ref={scrollRef}
        className="absolute flex h-full w-[800%] top-0 left-0 z-0"
      >
        {/* Duplicate the image loop for seamless scrolling */}
        {[...backgroundImages, ...backgroundImages].map((img, index) => (
          <div
            key={index}
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${img})`,
              minWidth: "100vw",
              filter: "brightness(0.5)",
            }}
          />
        ))}
      </div>

      {/* Gradient shadow overlay for better text visibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/30 to-black/60" />

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 font-ubuntu">
  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] leading-tight tracking-wide">
    Warriors of Heritage
  </h1>
  <p className="text-lg md:text-2xl max-w-2xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
    1000ms ping? No problem. Outsmarting lag, dominating chaos — one clutch at a time.
  </p>
</div>
    </div>
  );
}
