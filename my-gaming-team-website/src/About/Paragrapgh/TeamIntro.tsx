import React from "react";

const TeamIntro: React .FC = () => {
    return (
         <section className="bg-white text-black py-16 px-6 md:px-20 font-ubuntu">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About the Team</h2>
      <div className="max-w-4xl mx-auto text-center text-gray-800 space-y-6 text-lg">
        <p>
          OutKast Gaming Team is a collective of focused and passionate gamers driven by excellence, community, and legacy. We compete in games like Apex Legends, FC24, Mortal Kombat 1, and Call of Duty, while fostering a tight-knit brotherhood that values respect over rank.
        </p>
        <p>
          Started by a group of underdogs, OutKast grew from a shared frustration with gatekeeping in the gaming world. We became a team that gives anyone — no matter their background — a platform to grow, compete, and be seen.
        </p>
      </div>
    </section>
    )
};


export default TeamIntro