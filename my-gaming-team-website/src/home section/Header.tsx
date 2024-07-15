import React, { useEffect } from "react";
import './Header.css'
import gsap from "gsap";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    useEffect (() => {
         const header = document.querySelector('.header') as HTMLElement;
         
         const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');

            } else {
                header.classList.remove('scrolled')
            }
         };

         window.addEventListener('scroll', handleScroll);


         return () => {
            window.removeEventListener('scroll', handleScroll)
         };
    }, []);


    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, { opacity: 1, duration: 0.3 });
      };
    
      const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, { opacity: 0.8, duration: 0.3 });
      };
    
    

    return (
        <header className="header">
            <nav className="navbar">
            <Link className="navbar-brand" to="/">Outkast</Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link"  to="/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link"  to="/teams" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Teams Info</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link"  to="/about" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>About</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link"  to="/contact" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Contact</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link"  to="/upcomingsessions" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Up comming Events</Link>
                        </li>
                    </ul>
            </nav>
        </header>
    )

}


export default Header