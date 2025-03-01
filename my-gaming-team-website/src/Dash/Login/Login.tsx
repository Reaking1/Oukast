import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import './login.css';

const Login: React.FC = () => {
    const { login, user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const userRole = user?.role || 'default';

    useEffect(() => {
        const loginPage = document.querySelector('.login-page') as HTMLElement;
        const container = document.querySelector('.login-container') as HTMLElement;

        gsap.set([loginPage, container], { opacity: 0 });

        const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
        timeline
            .to(loginPage, { opacity: 1, duration: 0.5 })
            .from(container, { y: -50, duration: 0.5 }, '-=0.3')
            .from('.login-form', { opacity: 0, scale: 0.9, duration: 0.5 }, '-=0.3');
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
 //the login container was the problem from the begin with and the login page
    return (
        <div className={`login-page ${userRole}-login`}>
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
