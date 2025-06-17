import React from 'react';


const questions = [
    {
       q: "Who are you",
       a: "I'm a developer and creator passionate about games and building meaningful communities like the Warriors of Heritage."
    },

      {
       q: "Why did you start this team?",
       a: "To unite underdogs, outsiders, and passionate gamers into one family that uplifts each other through skill, respect, and legacy."
    },
      {
       q: "What's the mission?",
       a: "To provide a platform for gamers to shine, compete, grow, and be part of a brotherhood that values heart over hype."
    },
];

const QASection: React.FC = () => {
    return (
        <div className="grid md:grid-cols-3 gap-6 mb-12">
            {questions.map((item, index) => (
                <div key={index} className="bg-[#2a253b] p-6 rounded-xl shadow-md hover:shadow-purple-400/30 transition duration-300" >
                    <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                    <p className="text-sm text-gray-300">{item.a}</p>
                </div>
            ))}
        </div>
    );
};

export default QASection;