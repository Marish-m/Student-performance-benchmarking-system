import axios from 'axios';
import { MOCK_USERS } from './mockData';

const API_URL = 'http://localhost:5000/api/auth';
export const USE_MOCK = true; // Central mock toggle

export const login = async (email, password) => {
    if (USE_MOCK) {
        const user = Object.values(MOCK_USERS).find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        throw new Error('Wrong password or mailid');
    }

    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const updateProfile = async (profileData) => {
    if (USE_MOCK) {
        const user = getCurrentUser();
        const updatedUser = { ...user, ...profileData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
    }
    // In real mode, use axios.put/patch...
    return profileData;
};

