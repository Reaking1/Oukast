import { faFire, faGamepad, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


const historyData = [
  {
    icon: <FontAwesomeIcon icon={faGamepad} size="xl" className="text-rose-500" />,
    title: "The Start (2023)",
    description:
      "It all began in 2023 — just me, my dreams, and the struggle of grinding through the unemployment line. While coding and studying, I started building the foundation of Warriors of Heritage.",
  },
  {
    icon: <FontAwesomeIcon icon={faUser} size="xl" className="text-purple-500" />,
    title: "The Spark (2024)",
    description:
      "Things changed in 2024 when I met my second-in-command, Bobby. That’s when TikTok content started rolling out, and the vision became obvious — this team was more than just a side hustle.",
  },
  {
    icon: <FontAwesomeIcon icon={faFire} size="xl" className="text-yellow-500" />,
    title: "Grinding for Legacy (2025+)",
    description:
      "Now in 2025, we’re all-in. Grinding daily on TikTok, ranking up in Apex, and welcoming new members. Warriors of Heritage is growing stronger with every post, every match, every day.",
  },
];
const TeamHistory: React.FC = () =>  {
    return (
       <section className="bg-[#0e0c1d] text-white py-16 px-6 md:px-20 font-ubuntu">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Our History</h2>
      <div className="max-w-4xl mx-auto space-y-10">
        {historyData.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="mt-1">{item.icon}</div>
            <div>
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    )
};

export default TeamHistory