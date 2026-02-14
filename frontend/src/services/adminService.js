import axios from 'axios';
import { MOCK_COURSES } from './mockData';

import { USE_MOCK } from './authService';

const API_URL = 'http://localhost:5000/api/admin';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return { headers: { 'Authorization': `Bearer ${user?.token}` } };
};

export const getDepartments = async () => {
    if (USE_MOCK) return ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'];
    const response = await axios.get(`${API_URL}/departments`, getAuthHeader());
    return response.data;
};

export const getCourses = async () => {
    if (USE_MOCK) return MOCK_COURSES;
    const response = await axios.get(`${API_URL}/courses`, getAuthHeader());
    return response.data;
};

export const addCourse = async (courseData) => {
    if (USE_MOCK) {
        MOCK_COURSES.push({ ...courseData, id: Date.now() });
        return { message: 'Course added (mock)' };
    }
    const response = await axios.post(`${API_URL}/courses`, courseData, getAuthHeader());
    return response.data;
};

export const getSystemStats = async () => {
    if (USE_MOCK) return import('./mockData').then(m => m.MOCK_ADMIN_SYSTEM_STATS);
    const response = await axios.get(`${API_URL}/system-stats`, getAuthHeader());
    return response.data;
};
