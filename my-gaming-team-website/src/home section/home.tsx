import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
//Deltas force
import Delta from '../assets/DELTA2.jpeg'
import heroImg from "../assets/logo.png"; // Adjust path to your image
//import Delta2 from '../assets/DELAT3.jpg'
//import Dela3 from '../assets/delta.jpg'
//zenless zone zero pics
import Zen from '../assets/ZEN.jpg'
//import Zen2 from '../assets/ZEN2.jpeg'
//import Zen3 from '../assets/ZEN3.png'
//import Zen4 from '../assets/ZEN4.jpg'
//import Zen5 from '../assets/ZEN5.jpeg'
//apex pics
import Apex1 from "../assets/APEX.jpg"
//import Apex2 from "../assets/APEX1.jpg"
//import Apex3 from "../assets/APE5.png"
//import Apex4 from "../assets/APEX6.jpeg"
//import Apex5 from '../assets/APEX7.jpg'

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const scrollingRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Horizontal scrolling animation (if needed)
    const scrollingElement = scrollingRef.current;
    if (scrollingElement) {
      gsap.to(scrollingElement, {
        x: "-36%",
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
    <div className="pt-24 px-4 md:px-12  min-h-screen text-black font-ancizar">
      {/* Intro Section */}
      <section className="w-[80%] mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Animated Image Left */}
        <div ref={scrollingRef} className="w-full md:w-1/2">
          <img
            src={heroImg}
            alt="Hero"
            className="w-[40%] mx-auto rounded-lg shadow-lg"
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
      {/* Delta Force Section */}
      <section className="mt-32 flex flex-col md:flex-row items-center gap-8" ref={(el) => {
        if (el) sectionsRef.current.push(el as HTMLDivElement)
      }}>
        <div className="w-full md:w-1/2">
          <img src={Delta} alt="Delta Force" className="rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Delta Force</h2>
          <p className="text-lg">Experience tactical missions, elite gunplay, and true military immersion. Delta Force stands tall in our lineup.</p>
        </div>
      </section>

      {/* Zenless Zone Zero Section */}
      <section className="mt-32 flex flex-col md:flex-row-reverse items-center gap-8" ref={(el) => {
        if (el) sectionsRef.current.push(el as HTMLDivElement)
      }}>
        <div className="w-full md:w-1/2">
          <img src={Zen} alt="Zenless Zone Zero" className="rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Zenless Zone Zero</h2>
          <p className="text-lg">Dive into an anime-inspired urban fantasy, filled with action-packed chaos and stunning characters.</p>
        </div>
      </section>

      {/* Apex Legends Section */}
      <section className="mt-32 flex flex-col md:flex-row items-center gap-8" ref={(el) => {
        if (el) sectionsRef.current.push(el as HTMLDivElement)
      }}>
        <div className="w-full md:w-1/2">
          <img src={Apex1} alt="Apex Legends" className=" w-[60%] rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Apex Legends</h2>
          <p className="text-lg">Clutching in 1000ms ping has never looked this good. Apex Legends is where we flex under pressure.</p>
        </div>
      </section>


     {/* Mission Section */}
      <section className="mt-32 text-center" ref={(el) => {
        if(el) sectionsRef.current.push(el as HTMLDivElement)
      }}>
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg md:text-xl">
          To show the world that even with high ping, South African gamers bring unmatched skill and heart.
        </p>
      </section>
    </div>
  );
};

export default Home;
