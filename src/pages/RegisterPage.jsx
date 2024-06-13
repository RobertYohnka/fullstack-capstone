import React, { useContext } from 'react';
import Register from '../auth/Register';
import { AuthContext } from '../auth/AuthContext';

const RegisterPage = () => {
    const { register } = useContext(AuthContext);

    const handleRegister = (user) => {
        try {
            register(user);
        } catch (error) {
            console.error('Registration failed:', error.mesage);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <Register onRegister={handleRegister} />
        </div>
    );
};

export default RegisterPage;
