import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

//Tip data 
const tips = [
      {
    title: "Zenless Zone Zero",
    image: "/assets/zenGoon.jpeg",
    description:
      "Master the chaos of New Eridu! Learn advanced combat techniques, team synergies, and upgrade routes to dominate the battlefield.",
    link: "/tips/ZenlessZoneZero",
  },
  {
    title: "Apex Legends",
    image: "/assets/APEX1.jpg",
    description:
      "Sharpen your aim and strategy! Our Apex Legends guide covers legends, weapons, and ranked play tips to boost your RP fast.",
    link: "/tips/ApexLegends",
  },
  {
    title: "Streaming Setup",
    image: "/assets/stream1.jpg",
    description:
      "Thinking of going live? Here’s how to build a clean, lag-free streaming setup with OBS, overlays, and pro-level audio settings.",
    link: "/tips/Streaming",
  },
  {
    title: "Delta Force",
    image: "/assets/DELAT3.jpg",
    description:
      "Learn tactical positioning, communication, and loadout optimization to become an unstoppable squad leader in Delta Force.",
    link: "/tips/DeltaForce",
  },
  {
    title: "Getting Fibre",
    image: "/assets/Firber.jpg",
    description:
      "Tired of lag spikes? This guide explains how to choose the right fibre plan, router setup, and ISP for seamless gaming.",
    link: "/tips/GettingFibre",
  },
];


const Tips: React.FC = () => {
    return(
        <div className=
        "min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white pt-24">
              {/* 🧠 Section 1 - Intro */}
      <header className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          🎮 Welcome Gamers to the Group’s Tips & Tricks!
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Get the edge with our curated gaming insights — from pro strats to streaming setups.  
          Whether you’re grinding ranked or setting up your first stream, we’ve got you covered.
        </p>
      </header>

      {/* 🕹️ Section 2 - Tips Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-20 max-w-6xl mx-auto">
        {tips.map((tip, index) => (
          <Card
            key={index}
            className="bg-gray-900 border border-gray-700 shadow-lg hover:scale-[1.02] transition-transform"
          >
            <CardHeader className="p-0">
              <img
                src={tip.image}
                alt={tip.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
            </CardHeader>
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <CardTitle className="text-xl font-bold mb-2">{tip.title}</CardTitle>
              <p className="text-gray-400 mb-4 text-sm">{tip.description}</p>
              <Link to={tip.link}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Know More →
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* 🧩 Section 3 - Footer */}
      <footer className="text-center py-6 border-t border-gray-700">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Oukast Gaming — Built for Gamers, by Gamers 🎮
        </p>
      </footer>
        </div>
    )
}


export default Tips;