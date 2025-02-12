import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import './login.css';
import { toast } from 'react-toastify';

//Testing will begin in the moring
const Login: React.FC = () => { 
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    //GSAP animations with the component mounts
    useEffect(() => {
        gsap.from(".login-container", {opacity: 0,y: -50,duration: 1, ease: "power2.out"});
        gsap.from(".login-form", { opacity: 0, scale: 0.9, duration: 1.2, ease: "back.out(1.7)", delay: 0.5});
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
       setError("");

       try {
        await login(email, password); // Call the login method from context
       } catch (err: unknown) {
        if(axios.isAxiosError(err) && err.response) {
            console.error("Login failed", err.response.data);
            setError(err.response.data.message || "Invaild credentails");
        } else {
            console.error("Login failed", err);
            setError("An unexpected error occurred");
        }
        toast.error("Login failed. Please check your credentails")
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
