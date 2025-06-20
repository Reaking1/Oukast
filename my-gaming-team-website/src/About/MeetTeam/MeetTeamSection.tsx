import React from "react";

const teamMembers = [
  {
    name: "Kaos",
    role: "Founder / Captain",
    game: "Apex Legends, ZZZ, Delta Force, Fortnite",
    image: "/assets/Me.jpg",
    quote: "Built from lag, trained by pain.",
  },
  {
    name: "DayDreamz",
    role: "Health and Support",
    game: "Apex Legends, Fortnite",
    image: "/assets/Bobby.jpg",
    quote: "I am the chilled guy of the squad here.",
  },
  {
    name: "Batman",
    role: "Attacker",
    game: "Apex Legends",
    image: "/assets/Batman.jpg",
    quote: "One shot, one win.",
  },
    {
    name: "Juicy",
    role: "Good luck charm",
    game: "Apex Legends",
    image: "/assets/Juicy.jpg",
    quote: "I am a newbie in this agme but bring the vibes",
  },
    {
    name: "Zexxy",
    role: "Attacker and hunter",
    game: "Apex Legends",
    image: "/assets/Zexxy.jpg",
    quote: "Playing on a potato PC but I am still better",
  },
  // Add more members here as needed
   {
    name: "Falcon",
    role: "Attacker and beam god",
    game: "Apex Legends, Delta Force",
    image: "/assets/falcon.jpg",
    quote: "I am on off but i am still the Goat",
  },
   {
    name: "Todo",
    role: "Just the cat guy of the squad",
    game: "Apex Legends, Roblox, any scary game",
    image: "/assets/Todo.jpg",
    quote: "I am here for vibes and stuff",
  },

];

const MeetTheTeam: React.FC = () => {
  return (
    <section className="bg-white text-black py-16 px-6 md:px-20 font-ubuntu">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet the Team</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition duration-300 group"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-purple-600">{member.role}</p>
              <p className="text-sm text-gray-700 mt-1">Games: {member.game}</p>
              <p className="text-xs text-gray-500 mt-3 opacity-0 group-hover:opacity-100 transition duration-300">
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
