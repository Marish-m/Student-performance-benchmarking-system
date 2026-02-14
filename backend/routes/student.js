const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all student routes
router.use(authMiddleware);

// Get student performance data with class average benchmarking
router.get('/:studentId/performance', async (req, res) => {
    try {
        const [marks] = await pool.execute(`
            SELECT 
                m.*, 
                c.course_name, 
                c.course_code,
                (SELECT AVG(total_marks) FROM marks WHERE course_id = m.course_id) as class_average
            FROM marks m 
            JOIN courses c ON m.course_id = c.id 
            WHERE m.student_id = ?
        `, [req.params.studentId]);
        res.json(marks);
    } catch {
        res.status(500).json({ message: 'Error fetching student performance' });
    }
});

// Get student profile
router.get('/:userId/profile', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM students WHERE user_id = ?', [req.params.userId]);
        if (rows.length === 0) return res.status(404).json({ message: 'Student not found' });
        res.json(rows[0]);
    } catch {
        res.status(500).json({ message: 'Error fetching student profile' });
    }
});

// Get academic history (past semesters)
router.get('/:studentId/history', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT semester, academic_year, AVG(total_marks) as gpa 
            FROM marks 
            WHERE student_id = ? 
            GROUP BY semester, academic_year
            ORDER BY semester DESC
        `, [req.params.studentId]);
        res.json(rows);
    } catch {
        res.status(500).json({ message: 'Error fetching academic history' });
    }
});

// Get attendance
router.get('/:studentId/attendance', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT a.date, a.status, c.course_name 
            FROM attendance a
            JOIN courses c ON a.course_id = c.id
            WHERE a.student_id = ?
            ORDER BY a.date DESC
        `, [req.params.studentId]);
        res.json(rows);
    } catch {
        res.status(500).json({ message: 'Error fetching attendance' });
    }
});

// Get recent activities (system-wide or user specific - currently simplified to last 10 global)
router.get('/activities', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT description, timestamp as time 
            FROM activities 
            ORDER BY timestamp DESC 
            LIMIT 10
        `);
        res.json(rows);
    } catch {
        res.status(500).json({ message: 'Error fetching activities' });
    }
});

module.exports = router;
