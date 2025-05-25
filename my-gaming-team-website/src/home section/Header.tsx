import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useAuth }from "../auth/hooks/useAuth";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";


const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const headerRef =useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTipsDropdownVisible, setTipsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  // GSAP Header Animation on Scroll
  useEffect(() => {
   let lastScrollY = window.scrollY;

   const updateHeader = () => {
    const currentScrollY = window.scrollY;
    const header = headerRef.current;

    if(!header) return;

    if(currentScrollY > lastScrollY) {
      gsap.to(header, {y: "-100%", duration: 0.4});
    } else {
      gsap.to(header, {y: "0%", duration: 0.4});
    }

    lastScrollY = currentScrollY;
   }

    window.addEventListener("scroll", updateHeader);
    return () => window.removeEventListener("scroll", updateHeader);
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
    gsap.to(".mobile-menu", { duration: 0.4, x: menuOpen ? "100%" : "0%" });
  };

  // Handle Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header ref={headerRef} className="fixed w-full top-0 left-0 bg-white border shadow-lg rounded-md overflow-hidden opacity-100 transition-all duration-300">
     <nav className="flex justify-between items-center px-6 py-4">
      <Link to="/" className="text-black font-bold text-xl tracking-wide">Warrios Of Heritage</Link>
      <ul className="hidden md:flex gap-8 text-black font-medium">
        <li><Link to="/">Home</Link></li>
        <li
        onMouseEnter={handleTipsMouseEnter}
        onMouseLeave={handleTipsMouseLeave}
        className="relative cursor-pointer"
        >
          <span>Tips</span>
          {isTipsDropdownVisible && (
            <ul 
            ref={dropdownRef}
            className="absolute left-0 top-full w-56 bg-white border shadow-lg rounded-md overflow-hidden opacity-0 transition-all duration-300">
   {[
    { path: "/tips/zenless", name: "Zenless Zone Zero"},
    {path: "/tips/Apexlegends", name: "Apex Legends"},
    {path: "/tips/Delta force", name: "Delta Force"},
    {path: "/tips/fiber", name: "Getting fibre"}
   ].map((game, index) => (
    <li key={index} className="hover:bg-gray-100 px-4 py-2 text-sm">
      <Link to={game.path}>{game.name}</Link>
    </li>
   ))}
            </ul>
          )}
        </li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/upcomingsessions">Upcoming Events</Link></li>
      </ul>

      {/** Hamburger Icon */}
      <button onClick={toggleMenu} className="md:hidden text-black">
        <FontAwesomeIcon icon={faBars} size='lg' />
      </button>
</nav>
      {/** Moblie Sliding Menu */}
      <div className="moblie-menu fixed top-0 right-0 h-screen w-64 bg-black text-white flex flex-col gap-6 p-6 transform translate-x-full md:hidden">
        <button onClick={toggleMenu} className="self-end text-white">
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        {!isAuthenticated ? (
          <Link to="/login" className="hover:text-gray-400">Log In</Link>
        ): (
          <>
          <Link to="/admin" className="hover:text-gray-400">Admin Dashboard</Link>
          <button onClick={handleLogout} className="mt-4 bg-red-500 px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
