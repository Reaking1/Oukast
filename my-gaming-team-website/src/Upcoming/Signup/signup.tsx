import React, { useState } from "react";
import {signup as signupService} from '../../services/auth'
import './Signup.css';
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [surname,setSurname] = useState('');
  const [email,setEmail] = useState('');
  const [dateOfBirth,setDateOfBirth] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await signupService({ name, surname, email, dateOfBirth,password, role:'admin'});
        navigate('/login');
    } catch (err:unknown) {
        console.error('Signup failed', err);
         
        if (err instanceof Error) {
            //Check if the errro object has a response property
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const messsge = (err as any).response?.data?.message || err.message || 'Signup failed';
            setError(messsge);
        } else {
            setError('Signup failed');
        }
    }
  };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Signup</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname:</label>
                    <input 
                        type="text" 
                        id="surname" 
                        value={surname} 
                        onChange={(e) => setSurname(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email"  
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        autoComplete="email" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input 
                        type="date" 
                        id="dateOfBirth" 
                        value={dateOfBirth} 
                        onChange={(e) => setDateOfBirth(e.target.value)} 
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
