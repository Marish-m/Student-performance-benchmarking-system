import axios from 'axios';
import { MOCK_FACULTY_STATS, MOCK_STUDENTS_BY_COURSE } from './mockData';

import { USE_MOCK } from './authService';

const API_URL = 'http://localhost:5000/api/faculty';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return { headers: { 'Authorization': `Bearer ${user?.token}` } };
};

export const getFacultyProfile = async (userId) => {
    if (USE_MOCK) return {
        id: 1,
        faculty_id: 'F001',
        first_name: 'Karthikeyan',
        last_name: 'M',
        department: 'Computer Science',
        designation: 'Professor'
    };
    const response = await axios.get(`${API_URL}/${userId}/profile`, getAuthHeader());
    return response.data;
};

export const getClassPerformance = async (courseId) => {
    if (USE_MOCK) return MOCK_FACULTY_STATS;
    const response = await axios.get(`${API_URL}/class-performance/${courseId}`, getAuthHeader());
    return response.data;
};

export const uploadMarks = async (marksData) => {
    if (USE_MOCK) return { message: 'Marks uploaded (mock)' };
    const response = await axios.post(`${API_URL}/upload-marks`, marksData, getAuthHeader());
    return response.data;
};

export const getStudentsByCourse = async (courseId) => {
    if (USE_MOCK) return MOCK_STUDENTS_BY_COURSE;
    const response = await axios.get(`${API_URL}/students-by-course/${courseId}`, getAuthHeader());
    return response.data;
};

export const getAnalyticsData = async () => {
    if (USE_MOCK) return import('./mockData').then(m => ({
        stats: m.MOCK_FACULTY_STATS,
        distribution: m.MOCK_DEPARTMENT_DISTRIBUTION
    }));
    const response = await axios.get(`${API_URL}/analytics`, getAuthHeader());
    return response.data;
};

export const getDepartments = async () => {
    if (USE_MOCK) return ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'];
    const response = await axios.get(`${API_URL}/departments`, getAuthHeader());
    return response.data;
};

export const getGradeDistribution = async (courseId) => {
    if (USE_MOCK) return import('./mockData').then(m => m.MOCK_GRADE_DISTRIBUTION);
    const response = await axios.get(`${API_URL}/grade-distribution/${courseId}`, getAuthHeader());
    return response.data;
};
