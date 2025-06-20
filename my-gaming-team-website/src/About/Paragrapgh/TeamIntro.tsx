import React from "react";

const TeamIntro: React.FC = () => {
  return (
    <section className="bg-white text-black py-16 px-6 md:px-20 font-ubuntu">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About the Team</h2>
      <div className="max-w-4xl mx-auto text-center text-gray-800 space-y-6 text-lg leading-relaxed">
        <p>
          <strong>Warriors of Heritage</strong> is a gaming team founded by an adult who had nothing but code, studies, and a dream. Born out of long nights and quiet hustles, this team is a safe haven for both employed and unemployed individuals looking for a squad to game with and truly enjoy life.
        </p>
        <p>
          While we dive into titles like <strong>Apex Legends</strong> and <strong>Zenless Zone Zero</strong>, our mission goes deeper. We’re trying every day to make it in this South African environment — chasing growth, community, and something bigger than ourselves.
        </p>
        <p>
          Here, it's all about <span className="font-semibold text-black">vibes, passion, and purpose</span>. Whether you’re grinding rank or just logging in to laugh with friends, Warriors of Heritage is your team.
        </p>
      </div>
    </section>
  );
};

export default TeamIntro;
