import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import '../styles/main.css';

const Login = () => {
    const { login } = useAuth(); // useAuth is a custom hook that returns the value of AuthContext
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(credentials.email, credentials.password);
            setError(null);
            navigate('/'); // Redirect to the home page after successful login (book buddy improvement :)
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Log in</button>
            </form >
            <p>
                Do you work at the University? <a href="/register">Register here for access.</a>
            </p>
        </div >
    );
};

export default Login;