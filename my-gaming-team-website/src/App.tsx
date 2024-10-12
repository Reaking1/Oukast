import React from 'react';
import {  Route, Routes, Navigate } from 'react-router-dom';
import Home from './home section/home';
import Teams from './Teams/teams';
import About from './About/about';
import Contact from './Contact/contact';
import UpcomingSessions from './Upcoming/Events/EventPage';
import Header from './home section/Header';
import SignUp from './Upcoming/Signup/signup';
import Login from './Upcoming/Login/Login';
import Admin from './Upcoming/Admin/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import EventPage from './Upcoming/Events/EventPage';
import AdminDashboard from './Upcoming/Admin/pages/AdminDashboard/AdminDashboard';
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
