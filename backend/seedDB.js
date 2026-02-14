const bcrypt = require('bcryptjs');
const pool = require('./db');

const seedDB = async () => {
    try {
        const hashedPassword = await bcrypt.hash('password123', 10);

        // 1. Insert Users
        await pool.execute('INSERT IGNORE INTO users (username, password, role, email) VALUES (?, ?, ?, ?)', ['admin', hashedPassword, 'admin', 'admin@spbs.com']);
        await pool.execute('INSERT IGNORE INTO users (username, password, role, email) VALUES (?, ?, ?, ?)', ['faculty1', hashedPassword, 'faculty', 'f1@spbs.com']);
        await pool.execute('INSERT IGNORE INTO users (username, password, role, email) VALUES (?, ?, ?, ?)', ['student1', hashedPassword, 'student', 's1@spbs.com']);

        // const [[userAdmin]] = await pool.execute('SELECT id FROM users WHERE username="admin"');
        const [[userF1]] = await pool.execute('SELECT id FROM users WHERE username="faculty1"');
        const [[userS1]] = await pool.execute('SELECT id FROM users WHERE username="student1"');

        // 2. Profiles
        await pool.execute('INSERT IGNORE INTO faculty (user_id, faculty_id, first_name, last_name, department, designation) VALUES (?, ?, ?, ?, ?, ?)', [userF1.id, 'F001', 'John', 'Smith', 'Computer Science', 'Professor']);
        await pool.execute('INSERT IGNORE INTO students (user_id, roll_number, first_name, last_name, department, semester, section) VALUES (?, ?, ?, ?, ?, ?, ?)', [userS1.id, 'S101', 'Alice', 'Wonder', 'Computer Science', 4, 'A']);

        // 3. Courses
        await pool.execute('INSERT IGNORE INTO courses (course_code, course_name, department, semester, credits) VALUES (?, ?, ?, ?, ?)', ['CS201', 'Data Structures', 'Computer Science', 4, 4]);
        await pool.execute('INSERT IGNORE INTO courses (course_code, course_name, department, semester, credits) VALUES (?, ?, ?, ?, ?)', ['CS202', 'Database Systems', 'Computer Science', 4, 3]);

        const [[course1]] = await pool.execute('SELECT id FROM courses WHERE course_code="CS201"');
        const [[student1]] = await pool.execute('SELECT id FROM students WHERE roll_number="S101"');

        // 4. Marks
        await pool.execute('INSERT IGNORE INTO marks (student_id, course_id, internal_marks, external_marks, total_marks, grade, semester, academic_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [student1.id, course1.id, 25, 65, 90, 'A+', 4, '2025-26']);

        // 5. Attendance
        const dates = ['2023-10-01', '2023-10-03', '2023-10-05', '2023-10-08', '2023-10-10'];
        for (const date of dates) {
            await pool.execute('INSERT IGNORE INTO attendance (student_id, course_id, date, status) VALUES (?, ?, ?, ?)', [student1.id, course1.id, date, 'Present']);
        }
        // Add one absent
        await pool.execute('INSERT IGNORE INTO attendance (student_id, course_id, date, status) VALUES (?, ?, ?, ?)', [student1.id, course1.id, '2023-10-12', 'Absent']);

        // 6. Activities
        await pool.execute('INSERT IGNORE INTO activities (user_id, activity_type, description) VALUES (?, ?, ?)', [userS1.id, 'Login', 'User logged in successfully']);
        await pool.execute('INSERT IGNORE INTO activities (user_id, activity_type, description) VALUES (?, ?, ?)', [userS1.id, 'Submission', 'Submitted assignment for CS201']);
        await pool.execute('INSERT IGNORE INTO activities (user_id, activity_type, description) VALUES (?, ?, ?)', [userF1.id, 'Login', 'Faculty logged in']);
        await pool.execute('INSERT IGNORE INTO activities (user_id, activity_type, description) VALUES (?, ?, ?)', [userF1.id, 'Grading', 'Updated marks for CS201']);

        console.log('Database seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err.message);
    }
};

module.exports = seedDB;
