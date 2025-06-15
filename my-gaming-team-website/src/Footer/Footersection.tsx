import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1f1b2e] text-white font-ubuntu px-6 md:px-20 py-12">
      <div className="grid md:grid-cols-3 gap-10 items-start">
        {/* Logo & Description */}
        <div>
          <h3 className="text-2xl font-bold mb-2">Warriors of Heritage</h3>
          <p className="text-sm text-gray-400">
            A gaming team & community built on skill, unity, and legacy.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-rose-400 transition">About Us</Link></li>
            <li><Link to="/tips" className="hover:text-rose-400 transition">Tips</Link></li>
            <li><Link to="/events" className="hover:text-rose-400 transition">Events</Link></li>
            <li><Link to="/contact" className="hover:text-rose-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 text-2xl">
            <a href="http://www.youtube.com/@Theghostking2003" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} className="hover:text-purple-400 transition" />
            </a>
            <a href="https://www.tiktok.com/@theghostking2003?is_from_webapp=1&sender_device=pc" aria-label="TikTok">
              <FontAwesomeIcon icon={faTiktok} className="hover:text-pink-400 transition" />
            </a>
            {/* I can't find link for gram */}
            <a href="#" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} className="hover:text-fuchsia-400 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Warriors of Heritage. All rights reserved.
      </div>
    </footer>
  );
}
