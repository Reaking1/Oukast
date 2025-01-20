// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const ProtectedRoute: React.FC<{ roles?: string[]}> = ({roles}) => {
        const {isAuthenticated, user} = useAuth();

        if(!isAuthenticated) {
          return <Navigate to="/login" />
        }

        if(roles && !roles.includes(user?.role)) {
          
          return <Navigate to="/unauthorized"/>
        }
        return <Outlet />;
};

export default ProtectedRoute;

