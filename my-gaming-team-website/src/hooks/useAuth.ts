


/**
 * Hook for accessing authentication-related context and utilities.
 */

import {AuthContext} from "../context/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAuth = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
// ✅ Ensure context is not null before accessing properties
if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider.");
}

const { isAuthenticated, user, handleLogin,handleLogout} = auth;


    /**
   * Handles user login and sets authentication context.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns Promise resolving with a success flag.
   */

    const login = async (
        email: string,
        password: string,
    ) => {
        
        try {
          await handleLogin(email,password);

          if(auth.user?.role === "superadmin") {
            navigate("/superadmin-dashboard");
          } else {
            navigate("/admin-dashboard");
          }
        } catch (error) {
           toast.error('Login failed. Please try again.');
        }
    };

    /**
   * Handles user logout and resets authentication context.
   */

    const logout = () => {
       handleLogout();
       navigate("/login");
    }


    return {
        isAuthenticated,
        user,
        login,
        logout,
    }


};

export default useAuth;