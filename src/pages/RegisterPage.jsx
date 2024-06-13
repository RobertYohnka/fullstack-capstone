import React, { useContext } from 'react';
import Register from '../auth/Register';
import { AuthContext } from '../auth/AuthProvider';

const RegisterPage = () => {
    const { register } = useContext(AuthContext);

    const handleRegister = (user) => {
        register(user);
    };

    return (
        <div>
            <h1>Register</h1>
            <Register onRegister={handleRegister} />
        </div>
    )
};

export default RegisterPage;
