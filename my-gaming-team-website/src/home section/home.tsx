// Home.tsx
import React from "react";


import StoryScrollSection from "./story/StoryScrollSection";
import InfiniteLoop from "./InfinteLoop";
import KnowMoreSection from "../KnowMoreSection/KnowMoreSection";
import Footer from "../Footer/Footersection";

const Home: React.FC = () => {  
  return (
    <div className="flex flex-col w-full">
     <InfiniteLoop />
    <StoryScrollSection />
    <KnowMoreSection />
    <Footer />
    </div>
  );
};

export default Home;
