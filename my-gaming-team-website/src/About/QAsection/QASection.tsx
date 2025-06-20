import React from 'react';


const qData = [
    {
        question: "Why was Warrios Of Heritage Gaming Team created?",
        answer: 
       `I created Warriors Of Heritage because I always wanted to be part of a gaming team — but in South Africa, even just finding a team to join can be tough. So I decided to build my own. This team was made for South African gamers who just want to belong, to compete, and to be part of something real.`
    },
    {
        question:"What makes this team different?",
        answer: 
        "This team doesn’t have sponsors or big assets — but it has heart. It’s built by TikTokers, unemployed youth, and even elders, all pushing themselves every day. They're doing what feels like God's work just to make a name in the gaming space. And despite everything, we’re still recognized as a real, up-and-coming gaming team. As the captain and CEO, I can say this team is a reflection of my journey and purpose."
    },
    {
        question: "Do you compete professionally?",
        answer: 
        "Yes and no. The reality is that in such a massive gaming space, it’s not always easy to find the right tournaments — especially without support or structure from the government. But whenever events are announced, we show up. Whether it’s local or something with potential international reach, we give it our all. So while we may not be fully “pro” yet, we’re definitely on the path — and we’re getting there. 💪"
    },
    {
        question: "What's the long-term goal?",
        answer: 
        "The dream is to grow Warriors of Heritage into the biggest streaming and gaming team in South Africa. I know there are many teams out there, but I want this one to stand out — not just through gameplay, but through presence. I aim to hit 1 million followers on TikTok and dominate all major streaming platforms. But it’s not just about me — I want to give others that same chance to shine. I want our content to rack up more watch hours than Netflix or DStv one day. That’s the vision: build a gaming legacy that inspires and uplifts."
    },
    {
    question: "What kind of players are you looking for?",
    answer: `I’m not looking for players who jump into people’s streams shouting “1v1 me, I’m the best.” That’s not the energy we need. I want real ones — the kind of people who know what it’s like to chase a job, face setbacks, and still have the passion to game. I believe working a job while grinding games shows your true character. Yes, gaming and streaming can make you rich, but in South Africa, it’s tough. So I’m looking for players who are trying to build something — who are serious about streaming, serious about growth, and serious about life.`
  },
  {
    question: "Is the team open to creators too?",
    answer: `Absolutely — this team isn’t just for gamers. We welcome creators of all kinds: videographers, editors, streamers, vloggers, even pro camera crew. If Adin Ross or Kai Cenat can build massive content squads showing off personality, meeting celebs, and streaming real life — why can’t we? We want to showcase that South Africa deserves to be part of the global Creator Academy. Our voices, our stories, our servers — they matter too.`
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