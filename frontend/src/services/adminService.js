import axios from 'axios';
import { MOCK_COURSES, ALL_MOCK_USERS, mockStore } from './mockData';
import { USE_MOCK } from './authService';

const API_URL = 'http://localhost:5000/api/admin';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return { headers: { 'Authorization': `Bearer ${user?.token}` } };
};

export const getDepartments = async () => {
    if (USE_MOCK) return ['AD', 'EC', 'AL', 'EE'];
    const response = await axios.get(`${API_URL}/departments`, getAuthHeader());
    return response.data;
};

export const getCourses = async () => {
    if (USE_MOCK) return mockStore.courses;
    const response = await axios.get(`${API_URL}/courses`, getAuthHeader());
    return response.data;
};

export const addCourse = async (courseData) => {
    if (USE_MOCK) {
        mockStore.courses.push({ ...courseData, id: Date.now() });
        return { message: 'Course added (mock)' };
    }
    const response = await axios.post(`${API_URL}/courses`, courseData, getAuthHeader());
    return response.data;
};

export const updateCourse = async (courseId, courseData) => {
    if (USE_MOCK) {
        const index = mockStore.courses.findIndex(c => c.id === courseId);
        if (index !== -1) mockStore.courses[index] = { ...mockStore.courses[index], ...courseData };
        return { message: 'Course updated (mock)' };
    }
    const response = await axios.put(`${API_URL}/courses/${courseId}`, courseData, getAuthHeader());
    return response.data;
};

export const deleteCourse = async (courseId) => {
    if (USE_MOCK) {
        mockStore.courses = mockStore.courses.filter(c => c.id !== courseId);
        return { message: 'Course deleted (mock)' };
    }
    const response = await axios.delete(`${API_URL}/courses/${courseId}`, getAuthHeader());
    return response.data;
};

export const getSystemStats = async () => {
    if (USE_MOCK) {
        const m = await import('./mockData');
        return {
            ...m.MOCK_ADMIN_SYSTEM_STATS,
            totalUsers: mockStore.users.length,
            totalStudents: mockStore.users.filter(u => u.role === 'student').length,
            totalFaculty: mockStore.users.filter(u => u.role === 'faculty').length,
            totalCourses: mockStore.courses.length
        };
    }
    const response = await axios.get(`${API_URL}/system-stats`, getAuthHeader());
    return response.data;
};

export const getUsers = async () => {
    if (USE_MOCK) {
        return [...mockStore.users];
    }
    const response = await axios.get(`${API_URL}/users`, getAuthHeader());
    return response.data;
};

export const createUser = async (userData) => {
    if (USE_MOCK) {
        const newUser = {
            ...userData,
            id: Date.now(),
            status: 'Active'
        };
        mockStore.users.unshift(newUser);
        
        // Add completely new students straight to the course mocked list to update the Faculty Dashboard table
        if (newUser.role === 'student') {
            mockStore.studentsByCourse.unshift({ 
                ...newUser, 
                internal_marks: null, external_marks: null, total_marks: null, grade: null 
            });
        }
        
        return { message: 'User created (mock)', defaultPassword: 'Welcome@123' };
    }
    const response = await axios.post(`${API_URL}/users`, userData, getAuthHeader());
    return response.data;
};

export const deleteUser = async (userId) => {
    if (USE_MOCK) {
        mockStore.users = mockStore.users.filter(u => u.id !== userId);
        mockStore.studentsByCourse = mockStore.studentsByCourse.filter(u => u.id !== userId);
        return { message: 'User deleted (mock)' };
    }
    const response = await axios.delete(`${API_URL}/users/${userId}`, getAuthHeader());
    return response.data;
};
