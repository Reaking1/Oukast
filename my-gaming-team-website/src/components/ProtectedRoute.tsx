// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: JSX.Element;
  role?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const {isAuthenticated ,user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
     return <Navigate to="/login" state={{ from: location}} replace />
  }

  // Check if the user is authenticated and has the 'admin' role
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
