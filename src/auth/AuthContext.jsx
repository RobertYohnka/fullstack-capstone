import React, { createContext, useState, useEffect } from "react";
import { registerUser, loginUser, logoutUser } from "./authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        //This checks for a token in local storage on the initial load
        if (token) {
            setIsAuthenticated(true);
            //This fetches user details from local storage
            const storedUser = JSON.parse(localStorage.getItem('user'));
            setUser(storedUser);
        }
    }, [token]);

    const register = (user) => {
        try {
            const registeredUser = registerUser(user);
            setUser(registeredUser);
            setIsAuthenticated(true);
            //This saves the user to local storage
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
            //This saves the user to local storage
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
        //This removes the user from local storage
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
