
//I set up this utility to retrieve users from local storage for now
const getUsersFromLocalStorage = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
};

//This saves users to local storage
const saveUsersToLocalStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
};

// Register user function
export const registerUser = (user) => {
    const users = getUsersFromLocalStorage();

    // Check if the email is already registered
    if (users.some(u => u.email === user.email)) {
        throw new Error('Email already registered');
    }

    // Add the new user to the list and save it
    users.push(user);
    saveUsersToLocalStorage(users);

    return user;
};

// Login user function
export const loginUser = (email, password) => {
    const users = getUsersFromLocalStorage();

    // Find the user
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Create a mock token
    const token = 'mock-token';
    localStorage.setItem('token', token);

    return { user, token };
};

// Logout user function
export const logoutUser = () => {
    localStorage.removeItem('token');
};
