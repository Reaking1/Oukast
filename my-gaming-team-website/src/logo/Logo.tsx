import React from "react";
import LogoImage from '../assets/logo for outkast.webp'

const Logo: React.FC = () => {
    return (
        <div className="logo-container">
            <img src={LogoImage} alt="OutKast Gaming Logo" className="logo" />
        </div>
    )
};

export default Logo