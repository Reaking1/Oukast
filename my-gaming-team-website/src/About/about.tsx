import React from 'react';
import './About.css'
import Logo from '../logo/Logo';
import Heading from '../Texts for about page/Heading/Heading';
import Paragraph from '../Texts for about page/Paragrapgh/Paragraph';

const about: React.FC = () => {
  return (
    <div className="about">
      <Logo />
      <Heading text="About OutKast Gaming Team"/>
      <Paragraph />
    </div>
  );
};

export default about;