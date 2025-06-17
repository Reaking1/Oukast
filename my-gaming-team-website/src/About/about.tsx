import React from 'react';
import FounderSection from './FounderSection/FounderSection';
import QASection from './QAsection/QASection';
import Footer from '@/Footer/Footersection';
import TeamIntro from './Paragrapgh/TeamIntro';
import TeamHistory from './Heading/TeamHistory';
import MeetTheTeam from './MeetTeam/MeetTeamSection';

const about: React.FC = () => {
  return (
   <div className="about-page">
    <FounderSection />
    <QASection />
    <TeamIntro />
    <TeamHistory />
    <MeetTheTeam />
    <Footer />
   </div>
  );
};

export default about;