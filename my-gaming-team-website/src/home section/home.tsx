// Home.tsx
import React from "react";


import StoryScrollSection from "./story/StoryScrollSection";
import InfiniteLoop from "./InfinteLoop";

const Home: React.FC = () => {  
  return (
    <div className="flex flex-col w-full">
     <InfiniteLoop />
    <StoryScrollSection />
    </div>
  );
};

export default Home;
