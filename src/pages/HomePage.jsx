import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const HomePage = () => {
    const { isAuthenticated, user } = useContext(AuthContext);

    return (
        <>
            <h1>RAS Data Portal</h1>
            {isAuthenticated ? (
                <h2>Welcome, {user.username}!</h2>
            ) : (
                <p>Please <a href="/login">log in</a> or <a href="/register">register</a> to access additional information.</p>

            )}
        </>
    );
};

export default HomePage;