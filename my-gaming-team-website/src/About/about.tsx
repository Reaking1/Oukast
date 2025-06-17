import React from 'react';
import './About.css'
import Heading from '../Texts for about page/Heading/Heading';
import Paragraph from '../Texts for about page/Paragrapgh/Paragraph';
import QASection from '@/Texts for about page/QA/QASection';
import profileImg from '../../public/assets/logo.gif'

const about: React.FC = () => {
  return (
    <div className="about container mx-auto px-4 py-12 font-unbuntu text-white">
      <div className="flex justify-center mb-8">
         {/* Personal Image */}
        <img src={profileImg} alt="Founder"  className='rounded-full w-40 object-cover border-4 border-purple-600 shadow-lg'/>
      </div>
       {/* Q&A Cards */}
      <QASection />
      <Heading text="About Warriors Of Heritage Gaming Team"/>
      <Paragraph />
    </div>
  );
};

export default about;