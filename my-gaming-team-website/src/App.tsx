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



const App: React.FC = () => {
  return (
     <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          }
          
          />
          <Route path='/admin-dashboard' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
          
          />
          <Route path='/super-admin-dashboard' element={
            <ProtectedRoute allowedRoles={['super-admin']}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
          
          />
          
         
          
        </Routes>
      </div>
    </>
  );
};

export default App;
