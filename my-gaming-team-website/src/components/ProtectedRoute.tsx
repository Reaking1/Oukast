// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
  roles?: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles, children}) => {
  const { isAuthenticated, user } = useAuth();

  if(!isAuthenticated) {
    return <Navigate to="/login" />;

  }

  //fix this
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" /> ;
  }

  return <>
  {children}
  </>
}
export default ProtectedRoute;

