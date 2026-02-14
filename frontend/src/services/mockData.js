export const MOCK_USERS = {
    admin: { id: 1, username: 'admin', email: 'admin@spbs.com', password: 'admin', role: 'admin', token: 'mock-token-admin' },
    faculty: { id: 2, username: 'faculty1', email: 'faculty@spbs.com', password: 'faculty', role: 'faculty', token: 'mock-token-faculty' },
    student: { id: 3, username: 'student1', email: 'student@spbs.com', password: 'student', role: 'student', token: 'mock-token-student' }
};

export const MOCK_COURSES = [
    { id: 1, course_code: 'CS201', course_name: 'Data Structures', department: 'Computer Science', semester: 4, credits: 4 },
    { id: 2, course_code: 'CS202', course_name: 'Database Systems', department: 'Computer Science', semester: 4, credits: 3 },
    { id: 3, course_code: 'CS301', course_name: 'Algorithms', department: 'Computer Science', semester: 5, credits: 4 },
    { id: 4, course_code: 'CS302', course_name: 'Operating Systems', department: 'Computer Science', semester: 5, credits: 3 },
    { id: 5, course_code: 'EE101', course_name: 'Basic Electronics', department: 'Electrical Engineering', semester: 1, credits: 4 }
];

export const MOCK_STUDENT_PERFORMANCE = [
    { id: 1, course_code: 'CS201', course_name: 'Data Structures', total_marks: 85, class_average: 78, internal_marks: 25, external_marks: 60, grade: 'A' },
    { id: 2, course_code: 'CS202', course_name: 'Database Systems', total_marks: 92, class_average: 82, internal_marks: 28, external_marks: 64, grade: 'A+' },
    { id: 3, course_code: 'CS101', course_name: 'Introduction to Programming', total_marks: 75, class_average: 80, internal_marks: 20, external_marks: 55, grade: 'B' }
];

export const MOCK_ACADEMIC_HISTORY = [
    { id: 1, semester: 1, gpa: 8.5, credits: 24, status: 'Completed', top_course: 'Math I' },
    { id: 2, semester: 2, gpa: 8.2, credits: 22, status: 'Completed', top_course: 'Digital Logic' },
    { id: 3, semester: 3, gpa: 8.8, credits: 24, status: 'Completed', top_course: 'Data Structures' },
    { id: 4, semester: 4, gpa: 8.6, credits: 20, status: 'In Progress', top_course: 'OS' },
];

export const MOCK_FACULTY_STATS = {
    average_marks: 79.5,
    highest_marks: 95,
    risk_count: 3,
    passing_rate: 85,
    failing_rate: 15
};

export const MOCK_STUDENTS_BY_COURSE = [
    { id: 1, roll_number: 'S101', first_name: 'Marish', last_name: 'M', department: 'Computer Science', total_marks: 92 },
    { id: 2, roll_number: 'S102', first_name: 'Bob', last_name: 'Builder', department: 'Computer Science', total_marks: 55 },
    { id: 3, roll_number: 'S103', first_name: 'Charlie', last_name: 'Brown', department: 'Computer Science', total_marks: 78 },
    { id: 4, roll_number: 'S104', first_name: 'Daisy', last_name: 'Miller', department: 'Computer Science', total_marks: 45 }
];

export const MOCK_DEPARTMENT_DISTRIBUTION = [
    { name: 'Computer Science', value: 45, color: '#6366f1' },
    { name: 'Electrical Eng', value: 25, color: '#f59e0b' },
    { name: 'Mechanical Eng', value: 30, color: '#10b981' }
];

export const MOCK_ATTENDANCE = {
    total_percentage: 88,
    course_wise: [
        { course_code: 'CS201', percentage: 92 },
        { course_code: 'CS202', percentage: 85 },
        { course_code: 'CS101', percentage: 78 }
    ]
};

export const MOCK_GRADE_DISTRIBUTION = [
    { grade: 'A+', count: 5, color: '#22c55e' },
    { grade: 'A', count: 12, color: '#6366f1' },
    { grade: 'B', count: 8, color: '#f59e0b' },
    { grade: 'C', count: 3, color: '#ef4444' }
];

export const MOCK_RECENT_ACTIVITIES = [
    { id: 1, type: 'marks_uploaded', title: 'Internal Marks Uploaded', description: 'Data Structures internal marks are now available.', time: '2h ago' },
    { id: 2, type: 'assignment', title: 'New Assignment', description: 'Database Systems: Assignment 3 due in 3 days.', time: '5h ago' },
    { id: 3, type: 'attendance_alert', title: 'Low Attendance', description: 'Your attendance in Intro to Programming is below 75%.', time: '1d ago' }
];

export const MOCK_ADMIN_SYSTEM_STATS = {
    server_status: 'Healthy',
    uptime: '15d 4h 22m',
    active_users: 142,
    database_size: '256 MB',
    last_backup: '2026-02-11 04:00 AM'
};
