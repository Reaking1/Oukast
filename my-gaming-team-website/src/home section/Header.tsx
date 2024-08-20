import React, { useEffect, useState } from "react";
import './Header.css';
import gsap from "gsap";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  useEffect(() => {
    const header = document.querySelector('.header') as HTMLElement;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isTeamsDropdownVisible, setTeamsDropdownVisible] = useState(false);

  const handleTeamsMouseEnter = () => {
    setTeamsDropdownVisible(true);
  };

  const handleTeamsMouseLeave = () => {
    setTeamsDropdownVisible(false);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { opacity: 0.8, duration: 0.3 });
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    gsap.to('.dropdown-menu', {
      duration: 0.3,
      height: menuOpen ? 0 : 'auto',
      opacity: menuOpen ? 0 : 1,
    });
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link className="navbar-brand" to="/">Outkast</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Home</Link>
          </li>
          <li
            className="nav-item"
            onMouseEnter={handleTeamsMouseEnter}
            onMouseLeave={handleTeamsMouseLeave}
          >
            <span className="nav-link">Teams Info</span>
            {isTeamsDropdownVisible && (
              <ul className="dropdown-menu">
                <li><Link to="/teams/apex">Apex Legends</Link></li>
                <li><Link to="/teams/cod">Call of Duty Warzone</Link></li>
                <li><Link to="/teams/fc24">FC24</Link></li>
                <li><Link to="/teams/mk">Mortal Kombat</Link></li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/upcomingsessions" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Upcoming Events</Link>
          </li>
          <li className="nav-item three-dot-menu" onClick={toggleMenu}>
            &#x22EE; {/* Unicode for vertical ellipsis */}
            <div className={`three-dot-dropdown ${menuOpen ? 'show' : ''}`}>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
