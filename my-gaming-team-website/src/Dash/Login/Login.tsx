import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { toast } from 'react-toastify';
import './login.css';

const Login: React.FC = () => {
    const { login,user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const userRole = user?.role || "default"; //fall back to default

    // GSAP animations when component mounts
    useEffect(() => {
        const loginPage = document.querySelector(".login-page") as HTMLElement;
        const container = document.querySelector(".login-container") as HTMLElement;
    
        // Ensure visibility before animation starts
        gsap.set(loginPage, { opacity: 1, height: "auto" });
        gsap.set(container, { opacity: 1 });
    
        // Animate login-page first
        gsap.from(loginPage, {
            opacity: 0,
            y: -50,  // More movement for dramatic effect
            duration: 0.6,
            ease: "power2.out",
        });
    
        // Animate login-container inside it
        gsap.from(container, {
            opacity: 0,
            scale: 0.95,
            duration: 0.7,
            ease: "back.out(1.4)",
            delay: 0.2,
        });
    }, []);
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setError("");

        try {
            await login(email, password);
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                console.error("Login failed", err.response.data);
                setError(err.response.data.message || "Invalid credentials");
            } else {
                console.error("Login failed", err);
                setError("An unexpected error occurred");
            }
            toast.error("Login failed. Please check your credentials");
        }
    };

    return (
        <div className={`login-page ${userRole === 'admin' ? 'admin-login' : userRole === 'super-admin' ? 'super-admin-login' : ''}`}>
        <div style={{ minHeight: "1px" }}></div> {/* Keeps parent from collapsing */}
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

