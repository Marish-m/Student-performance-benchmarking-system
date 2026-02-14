import axios from 'axios';
import { MOCK_STUDENT_PERFORMANCE } from './mockData';
import { USE_MOCK } from './authService';

const API_URL = 'http://localhost:5000/api/student';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return { headers: { 'Authorization': `Bearer ${user?.token}` } };
};

export const getStudentProfile = async (userId) => {
    if (USE_MOCK) return {
        id: 1,
        roll_number: 'S101',
        first_name: 'Marish',
        last_name: 'M',
        department: 'Computer Science',
        semester: 4
    };
    const response = await axios.get(`${API_URL}/${userId}/profile`, getAuthHeader());
    return response.data;
};

export const getStudentPerformance = async (studentId) => {
    if (USE_MOCK) return MOCK_STUDENT_PERFORMANCE;
    const response = await axios.get(`${API_URL}/${studentId}/performance`, getAuthHeader());
    return response.data;
};

export const getAcademicHistory = async (studentId) => {
    if (USE_MOCK) return import('./mockData').then(m => m.MOCK_ACADEMIC_HISTORY);
    const response = await axios.get(`${API_URL}/${studentId}/history`, getAuthHeader());
    return response.data;
};

export const getAttendance = async (studentId) => {
    if (USE_MOCK) return import('./mockData').then(m => m.MOCK_ATTENDANCE);
    const response = await axios.get(`${API_URL}/${studentId}/attendance`, getAuthHeader());
    return response.data;
};

export const getRecentActivities = async () => {
    if (USE_MOCK) return import('./mockData').then(m => m.MOCK_RECENT_ACTIVITIES);
    const response = await axios.get(`${API_URL}/activities`, getAuthHeader());
    return response.data;
};
