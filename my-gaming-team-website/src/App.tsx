import React from 'react';
import {  Route, Routes, Navigate } from 'react-router-dom';
import Home from './home section/home';
import About from './About/about';
import Contact from './Contact/contact';
import Header from './home section/Header';
import ProtectedRoute from './components/ProtectedRoute';
import EventPage from './Dash/Events/EventPage';
import Login from './Dash/Login/Login';


const App: React.FC = () => {
  return (
     <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<ProtectedRoute roles={["admin", "superadmin"]}><EventPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
