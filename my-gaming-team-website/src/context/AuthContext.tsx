import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Define the type for the user (replace with your actual user type)
interface User {
    role: string;
    id: string;
    name: string;
    email: string;
    // Add other user properties as needed
}

// Define the type for the context
export type AuthContextType = {
    user: User | null; // Set the user type to User or null
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null); // Define user state as User or null

    // Login function
    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            setUser(response.data.user); // Ensure this aligns with your API response
        } catch (error) {
            console.error('Login failed', error);
            throw error; // Rethrow error for handling in Login component
        }
    };

    // Logout function
    const logout = () => {
        setUser(null); // Clear user state on logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
