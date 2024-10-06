import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Admin } from '../types';
import { login as loginService } from '../services/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    admin: Admin | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: null,
    admin: null,
    login: async () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
    const [admin, setAdmin] = useState<Admin | null>(null);
    
    
    useEffect(() => {
        if(token) {
            localStorage.setItem('access_token', token);
             // Optionally, decode token to get admin info or fetch admin details
    
        } else {
            localStorage.removeItem('access_token');
            setAdmin(null);
        }
    }, [token]);
    const login = async (email: string, password:string) => {
        const data = await loginService({ email, password});
        setToken(data.access_token);
    // Optionally, decode token to get admin info
    // Or fetch admin details from backend using token
    // For simplicity, we'll assume the token contains necessary info
    const payload = JSON.parse(atob(data.access_token.split('.')[1]));
    setAdmin({ _id: payload.id, email: payload.email, role:payload.role } as Admin);
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, token, admin, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};


