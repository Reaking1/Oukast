import { ChangeEvent, FormEvent, useState } from "react";
import './Signup.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        surname: '',
        dateofbirth: '',
        password: '',
        confirmPassword: '',
        role: 'admin', // default role is admin
    });

    // Corrected function name and added type for the event
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            console.log('Response:', response); // Log the entire response object
    
            // Check if the response is not empty
            if (!response.ok) {
                const errorMessage = await response.text(); // Read the error message if it's in plain text
                throw new Error(errorMessage);
            }
    
            const data = await response.json();
            console.log('Data:', data); // Log the parsed JSON
    
            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/admin';
            } else {
                alert(data.message);
            }
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
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname</label>
                    <input type="text" name="surname" id="surname" value={formData.surname} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="dateofbirth">Date of Birth</label>
                    <input type="date" name="dateofbirth" id="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select name="role" id="role" value={formData.role} onChange={handleChange} required>
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
