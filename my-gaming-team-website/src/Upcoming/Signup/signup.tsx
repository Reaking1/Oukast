import React, { ChangeEvent, FormEvent, useState } from "react";
import './Signup.css';

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        surname: '',
        dateOfBirth: '', // Make sure the case matches with the backend
        password: '',
        confirmPassword: '',
        role: 'admin', // default role is admin
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value || '', // Ensure the value is never undefined
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    dateOfBirth: new Date(formData.dateOfBirth).toISOString().split('T')[0], // Format date as YYYY-MM-DD
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('Sign-up successful:', data);
            localStorage.setItem('token', data.token);
            window.location.href = '/admin';
        } catch (error) {
            console.error('Sign-up failed:', error);
        }
    }; 

    return (
        <div className="signup-container">
            <h2 className="signup-heading">Admin Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        autoComplete="email" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname</label>
                    <input 
                        type="text" 
                        name="surname" 
                        id="surname" 
                        value={formData.surname} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input 
                        type="date" 
                        name="dateOfBirth" 
                        id="dateOfBirth" 
                        value={formData.dateOfBirth} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        autoComplete="password" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        autoComplete="password" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select 
                        name="role" 
                        id="role" 
                        value={formData.role} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="admin">Admin</option>
                        <option value="super admin">Super Admin</option>
                    </select>
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
