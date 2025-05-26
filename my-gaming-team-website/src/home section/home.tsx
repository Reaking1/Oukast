import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import heroImg from "../assets/dev1.jpg"; // Adjust path to your image

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const scrollingRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Horizontal scrolling animation (if needed)
    const scrollingElement = scrollingRef.current;
    if (scrollingElement) {
      gsap.to(scrollingElement, {
        x: "-50%",
        ease: "linear",
        repeat: -1,
        duration: 20,
      });
    }

    // Scroll-triggered section animations
    sectionsRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div className="pt-24 px-4 md:px-12 bg-[#f6f3ff] min-h-screen text-black font-ancizar">
      {/* Intro Section */}
      <section className="flex flex-col md:flex-row items-center gap-10">
        {/* Animated Image Left */}
        <div ref={scrollingRef} className="w-full md:w-1/2">
          <img
            src={heroImg}
            alt="Hero"
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Info Card Right */}
        <div
          className="w-full md:w-1/2 text-center md:text-left"
          ref={(el) => el && sectionsRef.current.push(el)}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-snug">
            Welcome to Warriors of Heritage
          </h1>
          <p className="text-lg md:text-xl">
            Where we play competitive games on a 1000ms ping and still dominate.
            Join us on this crazy journey of laughs, rage, and epic clutch moments.
          </p>
        </div>
      </section>

      {/* Example Scroll Trigger Section */}
      <section
        className="mt-32 text-center"
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg md:text-xl">
          To show the world that even with high ping, South African gamers bring unmatched skill and heart.
        </p>
      </section>
    </div>
  );
};

export default Home;
