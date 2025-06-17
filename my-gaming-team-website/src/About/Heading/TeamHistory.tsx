import { faFire, faGamepad, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


const historyData = [
  {
    icon: <FontAwesomeIcon icon={faGamepad} size="xl" className="text-rose-500" />,
    title: "The Beginning (2021)",
    description:
      "Started by a tight group of gaming friends frustrated by the lack of recognition in tournaments and local communities. OutKast was born out of rebellion.",
  },
  {
    icon: <FontAwesomeIcon icon={faUser} size="xl" className="text-purple-500" />,
    title: "The Rise (2022)",
    description:
      "With TikTok clips, custom logos, and late-night grind sessions, OutKast started gaining followers and recognition — not for wins, but for heart.",
  },
  {
    icon: <FontAwesomeIcon icon={faFire}  size="xl" className="text-yellow-500" />,
    title: "Legacy Mode (2024+)",
    description:
      "Today, the mission is clear — build a legacy. OutKast trains together, streams together, and competes to become legends known beyond ranks.",
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