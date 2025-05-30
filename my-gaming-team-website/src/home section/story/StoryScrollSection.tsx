import { useEffect, useRef } from "react"
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"


gsap.registerPlugin(ScrollTrigger);

const storyBlocks = [

 {
    text: "Having the highest lag well we are practicing our aim",
    img: "/assets/Screenshots/Apex Legends-03.jpeg", // ✅ corrected
    side: "left",
  },
  {
    text: "Playing with randoms that, some quite intresting status",
    img: "/assets/Screenshots/Apex Legends-005.jpeg",
    side: "right",
  },
  {
    text: "The absoulte kaos of playing with bots and sweats in actuall warzone",
    img: "/assets/Screenshots/Delta Force-09.jpeg",
    side: "left",
  },
  {
    text: "Having the highest lag well we are practicing our aim",
    img: "/assets/Screenshots/Delta force-13.jpeg",
    side: "right",
  },

];

export default function StoryScrollSection() {
    const sectionsRef = useRef<HTMLDivElement[]>([]);
    const imagesRef = useRef<HTMLImageElement[]>([]);


    useEffect(() => {
        sectionsRef.current.forEach((el, i) => {
            if(!el) return;

            gsap.fromTo(
                el,
                {
                    opacity: 0,
                    x: storyBlocks[i].side === "left" ? -100 : 100,
                    filter: "blur(10px)",
                },
                {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    duration: 1.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                }
            );
        });

        imagesRef.current.forEach((img) => {
            if(!img) return;
            gsap.to(img, {
                yPercent: -10,
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });
    }, [])
    return (
         <section className="w-full py-24 space-y-32 font-['Orbitron'] text-[#fff] relative z-10"
         style={{
           background: "linear-gradient(135deg, #ffffff 0%, #8c70a8 25%, #ffffff 50%, #8c70a8 75%, #ffffff 100%)"
         }}>
      {storyBlocks.map((block, i) => (
        <div
          key={i}
          ref={(el) => (sectionsRef.current[i] = el!)}
          className={`flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-20 relative z-20 ${
            block.side === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold leading-snug drop-shadow-xl">
              {block.text}
            </h2>
            <div className="mt-4 w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-400 mx-auto md:mx-0 rounded-full"></div>
          </div>
          <div className="md:w-1/2">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
              <img
                ref={(el) => (imagesRef.current[i] = el!)}
                src={block.img}
                alt="game moment"
                className="w-full h-auto object-cover brightness-[0.9] transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black opacity-30 mix-blend-multiply rounded-2xl"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Overlay effects */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-transparent to-black/80 z-0"></div>
    </section>
    )
}

