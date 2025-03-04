import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import './login.css';

const Login: React.FC = () => {
    const { login } = useAuth(); // Removed userRole for now
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('GSAP loaded');

        const loginContainer = document.querySelector('.login-container') as HTMLElement;

        if (loginContainer) {
            gsap.set(loginContainer, { opacity: 1, scale: 1 }); // Ensure visibility before animation
            gsap.from(loginContainer, { opacity: 0.8,scale: 0.9, y: -30, duration: 0.5, ease: 'power2.out' });
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Invalid credentials');
            } else {
                setError('An unexpected error occurred');
            }
            toast.error('Login failed. Please check your credentials');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
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
                            autoComplete="current-password"
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
