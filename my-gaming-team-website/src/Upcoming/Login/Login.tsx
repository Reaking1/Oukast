import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './Login.css';

const Login: React.FC = () => {
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email,password);
            navigate('/admin');
        } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
            console.error('Login failed', err.response.data);
            setError(err.response.data.message || 'Invail credentails')
        } else {
            console.error('Login failed', err);
            setError('An unexpected errror occurred')
        }
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {error && <p className='error'>{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
