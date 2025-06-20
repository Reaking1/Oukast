import React from "react";

const FounderSection: React.FC = () => {
  return (
    <section className="founder-section bg-[#f3eaf9] text-[#111] text-center pt-32 pb-16 px-4 font-unbuntu">
      <img 
        src="/assets/Founder.jpg" // Replace with your image path
        alt="Founder of OutKast Gaming"
        className="w-40 h-40 rounded-full mx-auto mb-6 shadow-lg object-cover"
      />
      <h2 className="text-3xl md:text-4xl font-bold ">Founder of OutKast Gaming Team</h2>
    </section>
  );
};

export default FounderSection;
