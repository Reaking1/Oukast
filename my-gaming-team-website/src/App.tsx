import React from 'react';
import {  Route, Routes, Navigate } from 'react-router-dom';
import Home from './home section/home';
import About from './About/about';
import Contact from './Contact/contact';
import Header from './home section/Header';
import ProtectedRoute from './auth/components/ProtectedRoute';
import EventPage from './Dash/Events/EventPage';
import Login from './auth/pages/Login';
import SuperAdminDashboard from './Dash/SuperAdmin/SuperAdmin-Dasboard';
import AdminDashboard from './Dash/Admin/Admin-Dashboard';


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

             {/* 🛠️ Protected Event Page */}
          <Route path="/events" element={<ProtectedRoute roles={["admin", "superadmin"]}><EventPage /></ProtectedRoute>} />

            {/* 🛠️ Add the Dashboard Routes */}
            <Route path="/superadmin-dashboard" element={<ProtectedRoute roles={["superadmin"]}><SuperAdminDashboard /></ProtectedRoute>} />
           // <Route path="/admin-dashboard" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
