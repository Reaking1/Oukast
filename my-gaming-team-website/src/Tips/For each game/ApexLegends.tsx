import React from "react";
import { apexParagraphs } from "./ApexLegendsParagraphs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ApexLegends: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white">
      {/* 🔹 Header Section */}
      <header className="text-center py-14">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          🔫 Apex Legends — Tips & Tricks
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Dominate the arena with strategic positioning, movement mastery, and
          squad synergy.
        </p>
      </header>

      {/* 🔹 Banner Image */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <img
          src="/images/apex-banner.jpg"
          alt="Apex Legends Banner"
          className="rounded-lg w-full h-72 object-cover shadow-lg"
        />
      </section>

      {/* 🔹 Tips Section */}
      <section className="max-w-4xl mx-auto px-6 space-y-8">
        {apexParagraphs.map((tip, index) => (
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
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            ← Back to All Tips
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ApexLegends;
