import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";




interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles?: string[];

} 


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, allowedRoles}) => {
    const {isAuthenticated, currentAdmin, loading} = useAuth();

    if(loading) {
        return <div className="text-center mt-4">Loading...</div>
    }
    

    //if user not logged in
    if(!isAuthenticated || !currentAdmin) {
        return <Navigate to="/login" replace />
    }


    if(allowedRoles && !allowedRoles.includes(currentAdmin.role)) {
     //Redirect based on their role
     if(currentAdmin.role === "super-admin") {
        return <Navigate to="/super-admin" replace />
     }
     else if(currentAdmin.role === "admin") {
        return <Navigate to="/admin" replace/>;
     } else {
        return <Navigate to="/login" replace />
     }
    }

    return children;
}

export default ProtectedRoute;