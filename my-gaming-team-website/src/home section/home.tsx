import React, { useEffect, useRef } from "react";
import './Home.css';
import MK1 from '../assets/Mortal kombat 1.jpg'
import FC24 from '../assets/fc-24-gameplay-demo.jpg'
import Apex from '../assets/1150018.jpg'
import Cod from '../assets/¿Qué computadora elegir para jugar Call of Duty_ Warzone sin romper el bolsillo_.jpg'
import gsap from "gsap";
import { Link } from "react-router-dom";
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
         <div className="scrolling-background">
            <div className="scrolling-images" ref={scrollingRef}>
                <img src={MK1} alt="mortal" />
                <img src={FC24} alt="fc24 hal" />
                <img src={Apex} alt="apex" />
                <img src={Cod} alt="cod" />
                <img src={MK1} alt="mortal" />
                <img src={FC24} alt="fc24 hal" />
                <img src={Apex} alt="apex" />
                <img src={Cod} alt="cod" /> 
            </div>
         </div>
         <main>
        <section className="intro-section">
          <h1>Welcome to OutKast Gaming Team</h1>
          <p>
          We are a team of passionate gamers dedicated to competing at the highest level in
            Apex Legends, FC24, Mortal Kombat 1, and Call of Duty. Our team is comprised of skilled players who
            strive to push the boundaries of what's possible in gaming. Join us as we take on
            new challenges, participate in tournaments, and grow together as a community.
          </p>
          <Link to="/about" className="read-more-link">Read More</Link>
        </section>
      </main>

      <div className="footer">
         <Footer />
      </div>
        </div>
    );
}

export default Home;
