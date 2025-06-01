import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import '../index.css'

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const dropdownRef = useRef<HTMLUListElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navigator = useNavigate();

  // Scroll behavior
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  // Tips dropdown animation
  const handleTipsMouseEnter = () => {
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        duration: 0.3,
        height: "auto",
        opacity: 1,
        display: "block",
      });
    }
  };

  const handleTipsMouseLeave = () => {
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        duration: 0.3,
        height: 0,
        opacity: 0,
        display: "none",
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigator("/login");
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full bg-gray-300 border-b shadow-md z-50 transition-transform duration-300 font-unbuntu ${
  scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="flex justify-between items-center  px-6 py-4">
        <Link
          to="/"
          className="text-black font-bold text-xl tracking-wide uppercase"
        >
          Warriors Of Heritage
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-black font-medium items-center">
          <li><Link to="/" className="link-rainbow">Home</Link></li>
          <li
            onMouseEnter={handleTipsMouseEnter}
            onMouseLeave={handleTipsMouseLeave}
            className="relative cursor-pointer"
          >
            <span className="link-rainbow">Tips</span>
            <ul
              ref={dropdownRef}
              className="absolute left-0 top-full mt-2 w-56 bg-white border shadow-lg rounded-md overflow-hidden z-50 transition-all duration-300"
              style={{ height: 0, opacity: 0, display: "none" }}
            >
              {[
                { path: "/tips/zenless", name: "Zenless Zone Zero" },
                { path: "/tips/Apexlegends", name: "Apex Legends" },
                { path: "/tips/Delta force", name: "Delta Force" },
                { path: "/tips/fiber", name: "Getting fibre" },
              ].map((game, index) => (
                <li key={index} className="hover:bg-gray-100 px-4 py-2 text-sm">
                  <Link to={game.path}>{game.name}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li><Link to="/about" className="link-rainbow">About</Link></li>
          <li><Link to="/contact" className="link-rainbow">Contact</Link></li>
          <li><Link to="/upcomingsessions" className="link-rainbow">Upcoming Events</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="z-50 text-black text-2xl p-2">
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} size="lg" />
        </button>
      </nav>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed top-0 right-0  w-64 bg-gray-300 p-6 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-6 text-black font-medium mt-24">

          {!isAuthenticated ? (
            <li><Link to="/login" onClick={toggleMenu} className="flex items-center gap-2 text-lg px-4 py-2 rounded hover:bg-white/50 transition duration-200">
              <FontAwesomeIcon icon={faUser} className="text-black" />
    
           <span className="text-black">Log In</span>
              
              </Link></li>
          ) : (
            <>
                  {/* Copy the login class */}
              <li><Link to="/admin" onClick={toggleMenu} className="text-lg hover:underline">Admin Dashboard</Link></li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
