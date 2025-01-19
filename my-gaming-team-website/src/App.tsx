import React from 'react';
import {  Route, Routes, Navigate } from 'react-router-dom';
import Home from './home section/home';
import Teams from './Teams/teams';
import About from './About/about';
import Contact from './Contact/contact';
import UpcomingSessions from './Dash/Events/EventPage';
import Header from './home section/Header';

import Login from './Dash/Login/Login';
import Admin from './Dash/Admin/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import EventPage from './Dash/Events/EventPage';
import AdminDashboard from './Dash/Admin/pages/AdminDashboard/AdminDashboard';
import './App.css';
import SuperAdminDashboard from './Dash/Admin/pages/SuperAdminDashboard/SuperAdminDashBoard';

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
       
           {/* Admin and Super Admin Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/super-admin" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
          
          <Route path="/events" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
