import React from "react";

const teamMembers = [
  {
    name: "Kaos",
    role: "Founder / Captain",
    game: "Apex Legends, ZZZ,Deltas Force,Fornite",
    image: "/images/kaos.jpg", // Adjust to your image path
    quote: "Built from lag, trained by pain.",
  },
  {
    name: "DayDreamz",
    role: "Health and Support",
    game: "ApexLegends,Fornite",
    image: "/images/grim.jpg",
    quote: "I am the chilled guy of the squad here",
  },
  {
    name: "Batman",
    role: "Attacker",
    game: "Apex Legends",
    image: "/images/phantom.jpg",
    quote: "One shot, one win.",
  },
];

const MeetTheTeam: React.FC = () => {
  return (
    <section className="bg-[#151222] text-white py-16 px-6 md:px-20 font-ubuntu">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet the Team</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#1e1b2f] rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 group"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-purple-400">{member.role}</p>
              <p className="text-sm text-gray-400 mt-1">Games: {member.game}</p>
              <p className="text-xs text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition duration-300">
                “{member.quote}”
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetTheTeam;
