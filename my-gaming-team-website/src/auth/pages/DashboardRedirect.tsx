import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";






const DashboardRedirect: React.FC = () => {
    const {currentAdmin, isAuthenticated, loading} = useAuth();
    const navigate = useNavigate()


    useEffect(() => {
        if(loading) return;
        if(!isAuthenticated || !currentAdmin) {
            navigate("/login");
            return;
        }

        if(currentAdmin.role === "super-admin") {
            navigate("/super-admin/dashboard");
        } else if (currentAdmin.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            console.warn("Unknow role, redirecting to login");
            navigate("/login");
        }
    }, [isAuthenticated,currentAdmin,loading,navigate]);

    return null;
}

export default DashboardRedirect