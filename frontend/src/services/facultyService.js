import axios from 'axios';
import { MOCK_FACULTY_STATS, MOCK_STUDENTS_BY_COURSE, mockStore } from './mockData';

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
    if (USE_MOCK) {
        const students = mockStore.studentsByCourse;
        const validMarks = students.map(s => s.total_marks).filter(m => m !== undefined && m !== null);
        if (validMarks.length === 0) return { average_marks: 0, highest_marks: 0, risk_count: 0, student_count: students.length };
        const average_marks = (validMarks.reduce((a, b) => a + Number(b), 0) / validMarks.length).toFixed(1);
        const highest_marks = Math.max(...validMarks);
        const risk_count = validMarks.filter(m => m < 60).length;
        return { average_marks, highest_marks, risk_count, student_count: students.length };
    }
    const response = await axios.get(`${API_URL}/class-performance/${courseId}`, getAuthHeader());
    return response.data;
};

export const uploadMarks = async (marksData) => {
    if (USE_MOCK) {
        const student = mockStore.studentsByCourse.find(s => s.id === marksData.student_id);
        if (student) {
            student.internal_marks = Number(marksData.internal_marks);
            student.external_marks = Number(marksData.external_marks);
            student.total_marks = student.internal_marks + student.external_marks;
            if (student.total_marks >= 90) student.grade = 'A+';
            else if (student.total_marks >= 80) student.grade = 'A';
            else if (student.total_marks >= 70) student.grade = 'B';
            else if (student.total_marks >= 60) student.grade = 'C';
            else if (student.total_marks >= 50) student.grade = 'D';
            else student.grade = 'F';
        }
        return { message: 'Marks uploaded (mock)' };
    }
    const response = await axios.post(`${API_URL}/upload-marks`, marksData, getAuthHeader());
    return response.data;
};

export const getStudentsByCourse = async (courseId) => {
    if (USE_MOCK) return [...mockStore.studentsByCourse];
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
    if (USE_MOCK) {
        const grades = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
        mockStore.studentsByCourse.forEach(s => { 
            if (s.grade && grades[s.grade] !== undefined) grades[s.grade]++; 
        });
        return [
            { grade: 'A+', count: grades['A+'], color: '#22c55e' },
            { grade: 'A', count: grades['A'], color: '#6366f1' },
            { grade: 'B', count: grades['B'], color: '#f59e0b' },
            { grade: 'C', count: grades['C'], color: '#eab308' },
            { grade: 'D', count: grades['D'], color: '#f97316' },
            { grade: 'F', count: grades['F'], color: '#ef4444' }
        ].filter(g => g.count > 0);
    }
    const response = await axios.get(`${API_URL}/grade-distribution/${courseId}`, getAuthHeader());
    return response.data;
};

export const getAllStudents = async () => {
    if (USE_MOCK) return mockStore.users.filter(u => u.role === 'student');
    const response = await axios.get(`${API_URL}/all-students`, getAuthHeader());
    return response.data;
};

export const enrollStudent = async (studentId, courseId, academicYear = '2025-26') => {
    if (USE_MOCK) {
        const student = mockStore.users.find(u => u.id === Number(studentId) || u.id === studentId);
        if (student && !mockStore.studentsByCourse.find(s => s.id === student.id)) {
            mockStore.studentsByCourse.unshift({ 
                ...student, 
                internal_marks: null, external_marks: null, total_marks: null, grade: null 
            });
        }
        return { message: 'Enrolled (mock)' };
    }
    const response = await axios.post(`${API_URL}/enroll-student`, { student_id: studentId, course_id: courseId, academic_year: academicYear }, getAuthHeader());
    return response.data;
};
