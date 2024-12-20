import React, { useEffect, useState } from "react";
import './Header.css';
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth'; // Import the useAuth hook

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // Destructure necessary values from useAuth

  useEffect(() => {
    const header = document.querySelector('.header') as HTMLElement;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
        gsap.to(header, { duration: 0.3, backgroundColor: "rgba(15, 30, 45, 0.9)" });
      } else {
        header.classList.remove('scrolled');
        gsap.to(header, { duration: 0.3, backgroundColor: "rgba(15, 30, 45, 0.8)" });
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
    gsap.to('.dropdown-menu', { duration: 0.3, height: 'auto', opacity: 1 });
  };

  const handleTeamsMouseLeave = () => {
    setTeamsDropdownVisible(false);
    gsap.to('.dropdown-menu', { duration: 0.3, height: 0, opacity: 0 });
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
    gsap.to('.three-dot-dropdown', {
      duration: 0.3,
      height: menuOpen ? 0 : 'auto',
      opacity: menuOpen ? 0 : 1,
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigate = useNavigate(); // Import useNavigate for navigation

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
        </ul>
        <div className="three-dot-menu" onClick={toggleMenu}>⋮</div>
        <div className={`three-dot-dropdown ${menuOpen ? 'show' : ''}`}>
          {!isAuthenticated ? (
            <>
              <Link to="/signup" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Sign Up</Link>
              <Link to="/login" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Log In</Link>
            </>
          ) : (
            <>
              <Link to="/admin" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Admin Dashboard</Link>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;