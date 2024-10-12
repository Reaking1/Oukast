import { useContext } from 'react';
import AuthContext, { AuthContextType } from "../context/AuthContext"

// Custom hook to use the AuthContext
const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    // Check if context is undefined and throw an error if so
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context; // Return the context value
};

export default useAuth;
