import React, { useEffect, useRef } from "react";

import MK1 from '../assets/thumb-1920-1331503.jpg'
import FC24 from '../assets/fc-24-gameplay-demo.jpg'
import Apex from '../assets/1078124.jpg'
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
                <img src={Cod} alt="codh" /> 
            </div>
         </div>
         <main>
        <section className="intro-section">
          <h2>Welcome to OutKast Gaming Team</h2>
          <p>
          We are a team of passionate gamers dedicated to competing at the highest level in
            Apex Legends, FC24, Mortal Kombat 1, and Call of Duty. Our team is comprised of skilled players who
            strive to push the boundaries of what's possible in gaming. Join us as we take on
            new challenges, participate in tournaments, and grow together as a community.
          </p>
          <Link to="/about" className="read-more-link">Read More</Link>
        </section>

        <section className="events-section">
          <h2>Upcoming Events</h2>
          <p>
          Stay tuned for our upcoming streams and local tournaments! Catch us live on Twitch and YouTube as we compete in exciting matches and events.
          </p>
          <Link to="/events" className="read-more-link">Learn More</Link>
        </section>

        <section className="team-section">
          <h2>Meet the Team</h2>
          <p>
            Get to know the talented members of the OutKast Gaming Team. Each player brings unique skills and dedication to the team, making us a formidable force in the gaming world.
          </p>
          <Link to="/team" className="read-more-link">Meet the Team</Link>
        </section>
      </main>

      <div className="footer">
         <Footer />
      </div>
        </div>
    );
}

export default Home;
