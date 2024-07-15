import React, { useEffect } from 'react';
import './teams.css';
import gsap from 'gsap';

const players = [
    'Player1',
    'Player2',
    'Player 3',

    //Add some more Players
];


const Teams: React.FC = () => {
    useEffect(() => {
        gsap.from('player',{opacity:0, y: 20, stagger: 0.2, duration: 0.5 })
    }, [])
  return (
  
    <div>
        <h1>Teams Info</h1>
        <li className='player'>{players}</li>
    </div>
  );
};

export default Teams;
