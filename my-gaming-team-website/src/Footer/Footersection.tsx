import React from 'react';
import './Footer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import MapComponent from '../Map/MapComponent';
import { Link } from 'react-router-dom';


const Footer: React.FC = () => {
  return (
   <footer className="footer">
    <div className="footer-map">
      <h2>Our location</h2>
   <MapComponent />
    </div>
    <div className="footer-teams">
      <h2>Teams</h2>
      <ul>
        <Link to="/teamsinfo">
        <li>Apex Legends</li>
        </Link>
        <Link to="/teamsinfo">
        <li>FC24</li>
        </Link>
        <Link  to="/teamsinfo">
        <li>Mortal Kombat 1</li>
        </Link>
        <Link  to="/teamsinfo">
        <li>Call of Duty</li>
        </Link>
      </ul>
    </div>
    <div className="footer-socials">
      <h2>Follow US</h2>
      <div className="social-icons">
        <a href='https://x.com/ghostkingmd?t=cQpWnr0d1IqL22PIscBTVA&s=09'>
        <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a  href='https://www.instagram.com/theghostking2003?igsh=MWx6eGR3d3o0NGl0cA=='>
        <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a  href='https://youtube.com/@terrornoisedivision3077?si=NMFjTcebqIEqMCEh'>
        <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a  href='https://x.com/ghostkingmd?t=cQpWnr0d1IqL22PIscBTVA&s=09'>
        <FontAwesomeIcon icon={faTwitch} />
        </a>
      </div>
    </div>
   </footer>
  );
};

export default Footer;