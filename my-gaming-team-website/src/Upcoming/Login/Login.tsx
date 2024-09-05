import { ChangeEvent, FormEvent, useState } from 'react';
//import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            // Ensure the response has content before attempting to parse JSON
            const data = response.headers.get('content-type')?.includes('application/json')
                ? await response.json()
                : {};
    
            if (!response.ok) {
                // This is the error block, handle the error here
                const errorData = data;
                console.log('Error Data:', errorData);  // Logs detailed error
                alert(errorData.message || 'Login failed');
            } else {
                // This is the success block
                // Save token to local storage or state management
                localStorage.setItem('token', data.token);
    
                // Redirect to the admin page
                window.location.href = '/admin';
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again later.');
        }
    };
    

    return (
        <div className="login-container">
            <h2 className="login-heading">Admin Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
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
                        autoComplete='password'
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
