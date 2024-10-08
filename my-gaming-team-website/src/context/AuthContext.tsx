import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Admin } from '../types';
import { login as loginService } from '../services/auth';

export interface AuthContextType {
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
    const [admin, setAdmin] = useState<Admin | null>(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('access_token', token);
            try {
                const payload = JSON.parse(atob(token.split('.')[1])) as { id: string; role: string; email?: string };
                setAdmin({ _id: payload.id, email: payload.email || '', role: payload.role } as Admin);
            } catch (error) {
                console.error('Failed to parse JWT token:', error);
                setToken(null);
                setAdmin(null);
            }
        } else {
            localStorage.removeItem('access_token');
            setAdmin(null);
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            const data = await loginService({ email, password });
            console.log('Login response data:', data); // Debugging line
            if (data && data.token) {
                setToken(data.token);

                const payload = JSON.parse(atob(data.token.split('.')[1])) as { id: string; role: string; email?: string };
                setAdmin({ _id: payload.id, email: payload.email || '', role: payload.role } as Admin);
            } else {
                throw new Error('Token not found in response');
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Propagate the error to be caught in Login.tsx
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, token, admin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
