import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./home section/home";
import Teams from "./Teams/teams";
import About from "./About/about";
import Contact from "./Contact/contact";
import UpcomingSessions from "./Upcoming/Events/EventPage";
import Header from "./home section/Header";
import './App.css'
import SignUp from "./Upcoming/Signup/signup";
import Login from "./Upcoming/Login/Login";
import Admin from "./Upcoming/Admin/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EventPage from "./Upcoming/Events/EventPage";

const App: React.FC = () => {
  return (
    <Router>
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
          <Route path="/admin" element={<ProtectedRoute>
            <Admin />
          </ProtectedRoute>} />
          <Route path="/events" element={
            <ProtectedRoute>
              <EventPage/>
            </ProtectedRoute>
          } />
           {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
