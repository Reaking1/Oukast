import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


// Define the type for the user (replace with your actual user type)
interface User {
    role: string;
    id: string;
    name: string;
    email: string;
    // Add other user properties as needed
}

interface DecodedToken {
    id: string;
    role: string;
    iat: number;
    exp: number;
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
    const navigate = useNavigate();

    // Login function
    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            
            if (response.data.token) {
                //Dceode the JWT token to get user data
                const decodedToken: DecodedToken = jwtDecode(response.data.token);


                // Set user based on the decoded token
                setUser({
                    id: decodedToken.id,
                    role: decodedToken.role,
                    name: decodedToken.name || "Default Name", // Assuming name is in the token
                    email: email,  
                });
                
                // Redirect based on role
                if (decodedToken.role === 'admin') {
                    navigate('/admin');
                } else if (decodedToken.role === 'super_admin') {
                    navigate('/super-admin');
                } else {
                    console.error('Unauthorized role'); // Handle any other roles
                }
            }
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
