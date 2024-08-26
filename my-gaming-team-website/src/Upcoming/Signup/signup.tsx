import  { ChangeEvent, FormEvent, useState } from "react";
import './Signup.css'


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
    const handleCahange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

        //Handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       if(formData.password !== formData.confirmPassword) {
        alert("Passswords do not match!")
        return;
       }
       // Handle form submission here (e.g., send to server)
        console.log(formData)
    };

    return (
        <div className="signup-container">
            <h2 className="signup-heading">Admin Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-heading">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"  value={formData.email} onChange={handleCahange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name"  value={formData.name} onChange={handleCahange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname</label>
                    <input type="text" name="surname" id="surname"  value={formData.surname} onChange={handleCahange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="dateofbirth">Date of Birth</label>
                    <input type="date" name="dateofbirth" id="dateofbirth"  value={formData.dateofbirth} onChange={handleCahange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password"  value={formData.password} onChange={handleCahange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Cofirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPssowrd"  value={formData.confirmPassword} onChange={handleCahange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                   <select name="role" id="role" value={formData.role} onChange={handleCahange} required>
                   <option value="admin">Admin</option>
                   <option value="superadmin">Super Admin</option>
                   </select>
                    
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    )
}


export default SignUp