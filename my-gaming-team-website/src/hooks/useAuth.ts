


/**
 * Hook for accessing authentication-related context and utilities.
 */

import AuthContext from "@/context/AuthContext"
import { useContext } from "react"
import { toast } from "react-toastify";

const useAuth = () => {
    const {
        isAuthenticated,
        user,
        login,
        logout,
        isAdmin,
        isSuperAdmin,
        setAuthToken,
    } = useContext(AuthContext);

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
            const response: LoginResponse = await login(email,password);
            setAuthToken(response.token);
            toast.success('Login successful!');
            return true
        } catch (error: any) {
            toast.error(error?.message ||  'Login failed. Please try again');
            return false;
        }
    };

    /**
   * Handles user logout and resets authentication context.
   */

    const handleLogout = () => {
        logout();
        toast.info('Logged out successfully')
    }


    return {
        isAuthenticated,
        user,
        isAdmin,
        isSuperAdmin,
        handleLogin,
        handleLogout,
    }


};

export default useAuth;