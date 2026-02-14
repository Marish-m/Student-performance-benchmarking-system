const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all admin routes
router.use(authMiddleware);

// Get all departments
router.get('/departments', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT DISTINCT department FROM students UNION SELECT DISTINCT department FROM faculty UNION SELECT DISTINCT department FROM courses');
        res.json(rows.map(r => r.department).filter(d => d));
    } catch {
        res.status(500).json({ message: 'Error fetching departments' });
    }
});

// Get all courses/subjects
router.get('/courses', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM courses');
        res.json(rows);
    } catch {
        res.status(500).json({ message: 'Error fetching courses' });
    }
});

// Add a new course
router.post('/courses', async (req, res) => {
    const { course_code, course_name, department, semester, credits } = req.body;
    try {
        await pool.execute(
            'INSERT INTO courses (course_code, course_name, department, semester, credits) VALUES (?, ?, ?, ?, ?)',
            [course_code, course_name, department, semester, credits]
        );
        res.status(201).json({ message: 'Course added successfully' });
    } catch {
        res.status(500).json({ message: 'Error adding course' });
    }
});

// Update a course
router.put('/courses/:id', async (req, res) => {
    const { course_code, course_name, department, semester, credits } = req.body;
    try {
        await pool.execute(
            'UPDATE courses SET course_code = ?, course_name = ?, department = ?, semester = ?, credits = ? WHERE id = ?',
            [course_code, course_name, department, semester, credits, req.params.id]
        );
        res.json({ message: 'Course updated successfully' });
    } catch {
        res.status(500).json({ message: 'Error updating course' });
    }
});

// Delete a course
router.delete('/courses/:id', async (req, res) => {
    try {
        await pool.execute('DELETE FROM courses WHERE id = ?', [req.params.id]);
        res.json({ message: 'Course deleted successfully' });
    } catch {
        res.status(500).json({ message: 'Error deleting course' });
    }
});

// Get system stats
router.get('/system-stats', async (req, res) => {
    try {
        const [[{ user_count }]] = await pool.execute('SELECT COUNT(*) as user_count FROM users');
        const [[{ student_count }]] = await pool.execute('SELECT COUNT(*) as student_count FROM students');
        const [[{ faculty_count }]] = await pool.execute('SELECT COUNT(*) as faculty_count FROM faculty');
        const [[{ course_count }]] = await pool.execute('SELECT COUNT(*) as course_count FROM courses');

        res.json({
            totalUsers: user_count,
            totalStudents: student_count,
            totalFaculty: faculty_count,
            totalCourses: course_count,
            activeSessions: Math.floor(user_count * 0.8) // Mocked active session for now
        });
    } catch {
        res.status(500).json({ message: 'Error fetching system stats' });
    }
});

module.exports = router;
