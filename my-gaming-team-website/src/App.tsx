import React from 'react';
import {  Route, Routes, Navigate } from 'react-router-dom';
import Home from './home section/home';
import Teams from './Teams/teams';
import About from './About/about';
import Contact from './Contact/contact';
import UpcomingSessions from './Dash/Events/EventPage';
import Header from './home section/Header';

import Login from './Dash/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import EventPage from './Dash/Events/EventPage';

import './App.css';


const App: React.FC = () => {
  return (
     <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/upcomingsessions" element={<UpcomingSessions />} />
          <Route path="/login" element={<Login />} />
      
          <Route path="/events" element={<ProtectedRoute roles={["admin", "superadmin"]}><EventPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
