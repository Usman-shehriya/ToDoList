import React, { useState } from 'react'; // Correct import statement
import './SignupForm.css'
import { useNavigate , Link } from 'react-router-dom';


const SignUpForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(''); // Using useState for lastName
    const [email, setEmail] = useState(''); // Using useState for email
    const [password, setPassword] = useState(''); // Using useState for password
    const [confirmPassword, setConfirmPassword] = useState(''); // Using useState for confirmPassword

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign-up logic here (e.g., validation, API call)
        console.log({ firstName, lastName, email, password, confirmPassword });

        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);

          // Sign-up validation
          if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Store user details in localStorage (This is just a placeholder for actual API/backend logic)
     

        alert('Sign-up successful! Redirecting to login.');

        navigate('/');

    };

    return (
        <div className="sign-up-container">
            <h2>Welcome in Task Management</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
                <p>already have an account ? <Link to="/">Sign In</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUpForm;
