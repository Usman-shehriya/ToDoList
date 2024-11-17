import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

  
    const handleSubmit = (e) => {
        e.preventDefault(); 

        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');

        
        if (email === storedEmail && password === storedPassword) {
            alert('Login successful!');
            localStorage.setItem('isAuthenticated', 'true');
            
            navigate('/ToDoList');
        } else {
        
            setError('Incorrect email or password'); 
        }
    };

    return (
        <div className='login-container'>
            <form className='form-container' onSubmit={handleSubmit}>
                <h2>Login</h2>

                
            {error && <p style={{ color: 'red' }}>{error}</p>}

                
                <div>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                       
                    />
                </div>

                
                <div>
                    
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                      
                    />
                </div>

            
                <button className='login-button' type="submit">Submit</button>
                <p>
                    Don't have an account? <Link to="/signupform">Sign Up</Link>
                </p>

                <div className="forget-password">
                    <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
