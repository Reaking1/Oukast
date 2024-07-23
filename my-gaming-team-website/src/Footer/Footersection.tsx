import React from 'react';
import './Footer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import MapComponent from '../Map/MapComponent';


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
        <li>Apex Legends</li>
        <li>FC24</li>
        <li>Mortal Kombat 1</li>
        <li>Call of Duty</li>
      </ul>
    </div>
    <div className="footer-socails">
      <h2>Follow US</h2>
      <div className="social-icons">
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faYoutube} />
        <FontAwesomeIcon icon={faTwitch} />
      </div>
    </div>
   </footer>
  );
};

export default Footer;