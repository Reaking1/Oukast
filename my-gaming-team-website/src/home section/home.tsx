// Home.tsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Delta from "../assets/DELTA2.jpeg";
import Apex1 from "../assets/APEX.jpg";
import Zen from "../assets/ZEN.jpg";
import heroImg from "../assets/logo.png";
import StoryScrollSection from "./story/StoryScrollSection";

const backgroundImages = [heroImg, Delta, Apex1, Zen];

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1 });

    bgRefs.current.forEach((bg, index) => {
      timeline.to(
        bg,
        { opacity: 1, duration: 1.5, ease: "power2.inOut" },
        index * 4
      );
      timeline.to(
        bg,
        { opacity: 0, duration: 1.5, ease: "power2.inOut" },
        index * 4 + 2.5
      );
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
    <div
      ref={containerRef}
      className="relative h-[60vh] w-full overflow-hidden text-white"
    >
      {/* Backgrounds */}
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) bgRefs.current[index] = el;
          }}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${img})`,
            opacity: index === 0 ? 1 : 0,
            zIndex: 0,
            filter: "brightness(0.6)",
          }}
        />
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Welcome to Warriors of Heritage
        </h1>
        <p className="text-lg md:text-2xl max-w-xl drop-shadow-md">
          Playing with 1000ms ping and still clutching. Welcome to the chaos.
        </p>
      </div>
    </div>
    <StoryScrollSection />
    </div>
  );
};

export default Home;
