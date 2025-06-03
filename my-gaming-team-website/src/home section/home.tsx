// Home.tsx
import React from "react";


import StoryScrollSection from "./story/StoryScrollSection";
import InfiniteLoop from "./InfinteLoop";
import KnowMoreSection from "../KnowMoreSection/KnowMoreSection";

const Home: React.FC = () => {  
  return (
    <div className="flex flex-col w-full">
     <InfiniteLoop />
    <StoryScrollSection />
    <KnowMoreSection />
    </div>
  );
};

export default Home;
