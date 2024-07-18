import React, { useEffect, useRef } from "react";
import './Home.css';
import MK1 from '../assets/Mortal kombat 1.jpg'
import FC24 from '../assets/fc-24-gameplay-demo.jpg'
import Apex from '../assets/1150018.jpg'
import gsap from "gsap";
import { Link } from "react-router-dom";

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
                <img src={MK1} alt="mortal" />
                <img src={FC24} alt="fc24 hal" />
                <img src={Apex} alt="apex" />
               
            </div>
         </div>
            <main>
                <h1>Welcome to OutKast Gaming Team</h1>
             <div className="cards-section">
                <div className="card">
                    <img src="" alt="d" />
                    <h2>About Team</h2>
                    <p>Learn more about our team and its memebers.</p>
                    <Link to="/about" className="card-link">Read More</Link>
                </div>
                <div className="card">
                    <img src="" alt="d" />
                    <h2>Teams Info</h2>
                    <p>Get to know the players and their roles.</p>
                    <Link to="/teams" className="card-link">Read More</Link>
                </div>
                <div className="card">
                    <img src="" alt="d" />
                    <h2>Upcoming Sesssions</h2>
                    <p>Stay updated with our upcoming gaming sessions.</p>
                    <Link to="/upcomingsessions" className="card-link">Read More</Link>
                </div>
                <div className="card">
                    <img src="" alt="d" />
                    <h2>Contact</h2>
                    <p>Contact us for any queries or information.</p>
                    <Link to="/contact" className="card-link">Read More</Link>
                </div>
             </div>
            </main>
        </div>
    );
}

export default Home;
