import React, { createContext, useState, useEffect } from 'react';
import { registerUser, loginUser, logoutUser } from './authService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
            const storedUser = JSON.parse(localStorage.getItem('user'));
            setUser(storedUser);
        }
    }, [token]);

    const register = async (user) => {
        try {
            const registeredUser = await registerUser(user);
            setUser(registeredUser);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(registeredUser));
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    };

    const login = (email, password) => {
        try {
            const { user, token } = loginUser(email, password);
            setUser(user);
            setToken(token);
            setIsAuthenticated(true);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error('Login failed:', error.message);
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        logoutUser();
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
    };

    console.log('AuthProvider children:', children); // Debugging log for children

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;