import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useAuth }from "../auth/hooks/useAuth";
import gsap from "gsap";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faX } from "@fortawesome/free-solid-svg-icons";


const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTipsDropdownVisible, setTipsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  // GSAP Header Animation on Scroll
  useEffect(() => {
    const header = document.querySelector(".header") as HTMLElement;
    const handleScroll = () => {
      gsap.to(header, {
        duration: 0.3,
        backgroundColor: window.scrollY > 50 ? "rgba(15, 30, 45, 0.9)" : "rgba(15, 30, 45, 0.8)",
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tips Dropdown Animation using useRef
  const handleTipsMouseEnter = () => {
    setTipsDropdownVisible(true);
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, { duration: 0.3, height: "auto", opacity: 1, display: "block" });
    }
  };

  const handleTipsMouseLeave = () => {
    setTipsDropdownVisible(false);
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, { duration: 0.3, height: 0, opacity: 0, display: "none" });
    }
  };

  // Toggle Modern Menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    gsap.to(".modern-menu", { duration: 0.4, x: menuOpen ? "100%" : "0%" });
  };

  // Handle Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link className="navbar-brand" to="/">Warriors Of Heritage</Link>
        <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

          {/* Tips Dropdown */}
          <li className="nav-item" onMouseEnter={handleTipsMouseEnter} onMouseLeave={handleTipsMouseLeave}>
            <span className="nav-link">Tips</span>
            {isTipsDropdownVisible && (
              <ul className="dropdown-menu" ref={dropdownRef}>
                {[
                  { path: "/tips/zenless", name: "Zenless Zone Zero" },
                  { path: "/tips/fortnite", name: "Fortnite" }, // Fixed typo
                  { path: "/tips/apex", name: "Apex Legends" },
                  { path: "/tips/mk", name: "Mortal Kombat" },
                  { path: "/tips/delta", name: "Delta Force" }, // Fixed typo
                ].map((game, index) => (
                  <li key={index}>
                    <Link to={game.path}>{game.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/upcomingsessions">Upcoming Events</Link></li>
        </ul>

        {/* Modern Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faGhost} size="1x" color="white"/>
        </div>
      </nav>

      {/* Modern Sliding Menu */}
      <div className={`modern-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faX} size="1x" color="white"/>
        </button>
        {!isAuthenticated ? (
          <Link to="/login">Log In</Link>
        ) : (
          <>
            <Link to="/admin">Admin Dashboard</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
