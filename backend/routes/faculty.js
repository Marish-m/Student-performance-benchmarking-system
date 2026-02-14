const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all faculty routes
router.use(authMiddleware);

// Get faculty profile and assigned classes/courses
router.get('/:userId/profile', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM faculty WHERE user_id = ?', [req.params.userId]);
        if (rows.length === 0) return res.status(404).json({ message: 'Faculty not found' });
        res.json(rows[0]);
    } catch {
        res.status(500).json({ message: 'Error fetching faculty profile' });
    }
});

// Get class performance summary for a course
router.get('/class-performance/:courseId', async (req, res) => {
    try {
        const [[stats]] = await pool.execute(`
            SELECT 
                AVG(total_marks) as average_marks,
                MAX(total_marks) as highest_marks,
                MIN(total_marks) as lowest_marks,
                COUNT(student_id) as student_count
            FROM marks 
            WHERE course_id = ?
        `, [req.params.courseId]);

        const [atRisk] = await pool.execute(`
            SELECT COUNT(*) as risk_count FROM marks 
            WHERE course_id = ? AND total_marks < 60
        `, [req.params.courseId]);

        res.json({ ...stats, risk_count: atRisk[0].risk_count });
    } catch {
        res.status(500).json({ message: 'Error fetching class performance' });
    }
});

// Upload / Update marks
router.post('/upload-marks', async (req, res) => {
    const { student_id, course_id, internal_marks, external_marks, semester, academic_year } = req.body;
    const total_marks = parseFloat(internal_marks) + parseFloat(external_marks);
    let grade = 'F';
    if (total_marks >= 90) grade = 'A+';
    else if (total_marks >= 80) grade = 'A';
    else if (total_marks >= 70) grade = 'B';
    else if (total_marks >= 60) grade = 'C';
    else if (total_marks >= 50) grade = 'D';

    try {
        await pool.execute(`
            INSERT INTO marks (student_id, course_id, internal_marks, external_marks, total_marks, grade, semester, academic_year) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                internal_marks = VALUES(internal_marks),
                external_marks = VALUES(external_marks),
                total_marks = VALUES(total_marks),
                grade = VALUES(grade)
        `, [student_id, course_id, internal_marks, external_marks, total_marks, grade, semester, academic_year]);
        res.status(200).json({ message: 'Marks uploaded successfully' });
    } catch {
        res.status(500).json({ message: 'Error uploading marks' });
    }
});

// Get students for a specific course (by department and semester)
router.get('/students-by-course/:courseId', async (req, res) => {
    try {
        const [[course]] = await pool.execute('SELECT department, semester FROM courses WHERE id = ?', [req.params.courseId]);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const [students] = await pool.execute('SELECT * FROM students WHERE department = ? AND semester = ?', [course.department, course.semester]);
        res.json(students);
    } catch {
        res.status(500).json({ message: 'Error fetching students' });
    }
});

// Get analytics for faculty dashboard
router.get('/analytics', async (req, res) => {
    try {
        const [[stats]] = await pool.execute(`
             SELECT 
                (SELECT COUNT(*) FROM students) as total_students,
                (SELECT AVG(total_marks) FROM marks) as average_performance,
                (SELECT COUNT(*) FROM courses) as active_courses
        `);

        const [distribution] = await pool.execute(`
            SELECT department, COUNT(*) as count 
            FROM students 
            GROUP BY department
        `);

        res.json({
            stats: { ...stats, average_performance: parseFloat(stats.average_performance || 0).toFixed(2) },
            distribution
        });
    } catch {
        res.status(500).json({ message: 'Error fetching analytics' });
    }
});

// Get grade distribution for a course
router.get('/grade-distribution/:courseId', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT grade as name, COUNT(*) as value 
            FROM marks 
            WHERE course_id = ? 
            GROUP BY grade
        `, [req.params.courseId]);
        res.json(rows);
    } catch {
        res.status(500).json({ message: 'Error fetching grade distribution' });
    }
});

// Get departments list
router.get('/departments', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT DISTINCT department FROM students UNION SELECT DISTINCT department FROM faculty');
        res.json(rows.map(r => r.department).filter(d => d));
    } catch {
        res.status(500).json({ message: 'Error fetching departments' });
    }
});

module.exports = router;
