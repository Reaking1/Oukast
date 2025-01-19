import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import React, { useState } from 'react';

import './login.css';
//Testing will begin in the moring
const Login: React.FC = () => { 
    const { login } = useAuth();
   

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password); // Call the login method from context
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                console.error('Login failed', err.response.data);
                setError(err.response.data.message || 'Invalid credentials');
            } else {
                console.error('Login failed', err);
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email" // This is suitable for email inputs
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password" // Use 'current-password' for security and accessibility
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
