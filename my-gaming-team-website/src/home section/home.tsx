import React, { useEffect, useRef } from "react";


import gsap from "gsap";

import Footer from "../Footer/Footersection";

const Home: React.FC = () => {

const scrollingRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        //scrolling animation for images
        const scrollingElement = scrollingRef.current;
        if(scrollingElement) {
            gsap.to(scrollingElement, {
                x: "-50%",
                ease: "linear",
                repeat: -1,
                duration: 20,
            });
        }
       
    },[])
    return (
        <div className="home">
         
     

      <div className="footer">
         <Footer />
      </div>
        </div>
    );
}

export default Home;
