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


    if(!isAuthenticated || !currentAdmin) {
        return <Navigate to="/login" replace/>
    }

    if(allowedRoles && !allowedRoles.includes(currentAdmin.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children;
}

export default ProtectedRoute;