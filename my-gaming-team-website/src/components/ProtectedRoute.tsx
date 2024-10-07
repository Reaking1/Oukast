import useAuth from "../hooks/useAuth"
import React from "react"
import { Navigate } from "react-router-dom";




interface ProtectedRouteProps {
    children: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated} = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children
};

export default ProtectedRoute