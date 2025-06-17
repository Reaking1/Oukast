import React from 'react';


const qData = [
    {
        question: "Why was Warrios Of Heritage Gaming Team created?",
        answer: 
        "Warrios Of Heritage was formed to unite underrepresented gamers who felt like outsiders. It's a space where skill, personality, and loyalty matter more than popularity."
    },
    {
        question:"What makes this team different?",
        answer: 
        "We focus not only on winning but on loyalty, personal growth, and storytelling through content and community."
    },
    {
        question: "Do you compete professionally?",
        answer: 
        "Yes, our members participate in online tournaments, community events, and livestreams while aiming to grow a unique fan base."
    },
    {
        question: "What's the long-term goal?",
        answer: 
        "To become a legacy brand that represents gamers who feel overlooked or underestimated, and inspire the next wave of creators."
    }
];

const QASection: React.FC = () => {
   return (
    <section className="bg-[#1f1b2e] text-white py-16 px-6 md:px-20 font-ubuntu">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Q&A with Founder</h2>
        <div className="grid gap-8 md:grid-cols-2">
            {qData.map((item, index) => (
                <div key={index} className="bg-[#2a243a] rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{item.question}</h3>
                    <p className="text-sm text-gray-300">{item.answer}</p>
                </div>
            ))}
        </div>
    </section>
   )
}
export default QASection