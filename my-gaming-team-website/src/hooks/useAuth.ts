


/**
 * Hook for accessing authentication-related context and utilities.
 */

import {AuthContext} from "@/context/AuthContext"
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

    const handleLogin = async (
        email: string,
        password: string,
    ): Promise<boolean> => {
        
        try {
            const response = await login(email,password);
            setAuthToken(response.token);
            toast.success('Login successful!');
            return true
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || "Login failed. Please try again.");
            } else {
                toast.error("An unexpected error occurred.");
            }
            return false;
        }
    };

    /**
   * Handles user logout and resets authentication context.
   */

    const handleLogout = () => {
      
    }


    return {
        isAuthenticated,
        user,
        handleLogin,
        handleLogout,
    }


};

export default useAuth;