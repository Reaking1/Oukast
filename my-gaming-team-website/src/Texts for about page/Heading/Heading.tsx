import React from "react";

interface HeadingProps {
    text: string
}


const Heading: React.FC<HeadingProps> = ({ text }) =>  {
    return (
        <h1 className="about-heading">{text}</h1>
    )
};

export default Heading