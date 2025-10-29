import React from "react";
import { streamingParagraphs } from "./StreamingParagraphs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Streaming: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
      {/* 🔹 Header */}
      <header className="text-center py-14">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          🎥 Streaming Tips for Gamers
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Level up your streaming setup — from mic quality to overlays — and make
          every broadcast look and sound professional.
        </p>
      </header>

      {/* 🔹 Banner Image */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <img
          src="/images/streaming-setup.jpg"
          alt="Streamer setup with lights and mic"
          className="rounded-lg w-full h-72 object-cover shadow-lg"
        />
      </section>

      {/* 🔹 Tips Section */}
      <section className="max-w-4xl mx-auto px-6 space-y-8">
        {streamingParagraphs.map((tip, index) => (
          <Card
            key={index}
            className="bg-gray-900 border border-gray-700 hover:scale-[1.01] transition-transform"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {tip.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm leading-relaxed">
                {tip.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* 🔹 Back Button */}
      <div className="flex justify-center py-10">
        <Link to="/tips">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
            ← Back to All Tips
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Streaming;
