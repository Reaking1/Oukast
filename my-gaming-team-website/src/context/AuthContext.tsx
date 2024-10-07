// AuthContext.tsx

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Admin } from '../types';
import { login as loginService } from '../services/auth';

export interface AuthContextType {  // <- Export this interface
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
            const payload = JSON.parse(atob(token.split('.')[1])) as { id: string; role: string };
            setAdmin({ _id: payload.id, email: '', role: payload.role } as Admin);
        } else {
            localStorage.removeItem('access_token');
            setAdmin(null);
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        const data = await loginService({ email, password });
        setToken(data.access_token);

        const payload = JSON.parse(atob(data.access_token.split('.')[1]));
        setAdmin({ _id: payload.id, email: payload.email, role: payload.role } as Admin);
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
