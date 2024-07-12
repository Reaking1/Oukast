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
        gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2})
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, {scale: 1, duration: 0.2});
    };


    return (
        <head className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navnar-brand" to="/">OutKast</Link>
                 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                 </button>
                 <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link"  to="/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link"  to="/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Teams Info</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link"  to="/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>About</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link"  to="/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Contact</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link"  to="/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Up comming Events</Link>
                        </li>
                    </ul>
                 </div>
            </nav>
        </head>
    )

}


export default Header