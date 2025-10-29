import React from 'react';
import {  Route, Routes} from 'react-router-dom';
import Home from './home section/home';
import About from './About/about';
import Contact from './Contact/contact';
import Header from './home section/Header';
import ProtectedRoute from './auth/components/ProtectedRoute';
import AdminDashboard from './Dash/Admin/Admin-Dashboard';
import SuperAdminDashboard from './Dash/SuperAdmin/SuperAdmin-Dasboard';
import Login from './auth/pages/Login';
import DashboardRedirect from './auth/pages/DashboardRedirect';
import { Toaster } from "@/components/ui/sonner"
import UpcomingEvents from './Upcoming Events/UpcomingEvents';
import Tips from './Tips/Tips';
import ApexLegends from './Tips/For each game/ApexLegends';
import ZenlessZoneZero from './Tips/For each game/ZenlessZoneZero';
import DeltaForce from './Tips/For each game/DeltaForce';
import Streaming from './Tips/For each game/Streaming';
import GettingFibre from './Tips/For each game/GettingFibre';


const App: React.FC = () => {
  return (
     <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/tips" element={<Tips />} />
  <Route path="/tips/ZenlessZoneZero" element={<ZenlessZoneZero />} />
  <Route path="/tips/ApexLegends" element={<ApexLegends />} />
  <Route path="/tips/Streaming" element={<Streaming />} />
  <Route path="/tips/DeltaForce" element={<DeltaForce />} />
  <Route path="/tips/GettingFibre" element={<GettingFibre />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/upcomingevents'  element={<UpcomingEvents />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          }
          
          />
      <Route path='/super-admin/*' element={
        <ProtectedRoute allowedRoles={['super-admin']}>
          <SuperAdminDashboard />
        </ProtectedRoute>
      } />
            <Route path='/admin/*' element={
              <ProtectedRoute  allowedRoles={['admins']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />  
         
          
        </Routes>
      </div>
   {/* ✅ Add this at the root (bottom of the tree) */}
      <Toaster richColors closeButton />
      
    </>
  );
};

export default App;
