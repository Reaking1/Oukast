import { useEffect, useRef } from "react"
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"


gsap.registerPlugin(ScrollTrigger);

const storyBlocks = [

 {
    text: "Training our aim under extreme lag — because easy mode is too boring.",
    img: "/assets/Screenshots/Apex Legends-03.jpeg", // ✅ corrected
    side: "right",
  },
  {
    text: "Randoms with stats so strange, I had to double-check",
    img: "/assets/Screenshots/Apex Legends-005.jpeg",
    side: "left",
  },
  {
    text: "Total madness: bots on one side, sweats on the other — welcome to Delta Force",
    img: "/assets/Screenshots/Delta Force-09.jpeg",
    side: "right",
  },
  {
    text: "Our Delta Force loadouts consistently land us in the top 5 — South Africa’s in the game",
    img: "/assets/Screenshots/Delta Force-13.jpeg",
    side: "left",
  },
   {
    text: "Ultimate abilities? We’re going full Gooner mode in Zenless Zone Zero.",
    img: "/assets/zen less zero g.jpg",
    side: "right",
  },
   {
    text: "Every boss in Zenless Zone Zero brought a warzone straight from hell.",
    img: "/assets/zen game 2.jpg",
    side: "left",
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
                yPercent: -5,
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    start: "top 90%",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });
    }, [])
    return (
         <section className="w-full py-24 space-y-32 font-ubuntu text-[#e4dddd] relative z-10"
        >
      {storyBlocks.map((block, i) => (
       <div
  key={i}
  ref={(el) => (sectionsRef.current[i] = el!)}
  className={`flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-20 relative z-20 ${
    block.side === "right" ? "md:flex-row-reverse" : ""
  }`}
>
  <div className="md:w-1/2 text-center md:text-left bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
    <h2 className="text-2xl md:text-4xl font-bold leading-snug drop-shadow-lg">
      {block.text}
    </h2>
  </div>
  <div className="md:w-1/2">
    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
      <img
        ref={(el) => (imagesRef.current[i] = el!)}
        src={block.img}
        alt="game moment"
        className="w-full h-auto object-cover brightness-[0.9] transition-all duration-500"
      />
    </div>
          </div>
        </div>
      ))}

      {/*dontforget the images
      */}

    </section>
    )
}

