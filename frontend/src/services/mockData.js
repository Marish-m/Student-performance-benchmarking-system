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
    { id: 3, course_code: 'CS101', course_name: 'Introduction to Programming', total_marks: 75, class_average: 80, internal_marks: 20, external_marks: 55, grade: 'B' },
    { id: 4, course_code: 'MA102', course_name: 'Discrete Mathematics', total_marks: 35, class_average: 65, internal_marks: 10, external_marks: 25, grade: 'F' }
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
    { id: 1, roll_number: 'S101', first_name: 'Marish', last_name: 'M', department: 'Computer Science', total_marks: 92, internal_marks: 28, external_marks: 64, grade: 'A+', email: 'marish@spbs.com' },
    { id: 2, roll_number: 'S102', first_name: 'Bob', last_name: 'Builder', department: 'Computer Science', total_marks: 55, internal_marks: 20, external_marks: 35, grade: 'D', email: 'bob@spbs.com' },
    { id: 3, roll_number: 'S103', first_name: 'Charlie', last_name: 'Brown', department: 'Computer Science', total_marks: 78, internal_marks: 24, external_marks: 54, grade: 'B', email: 'charlie@spbs.com' },
    { id: 4, roll_number: 'S104', first_name: 'Daisy', last_name: 'Miller', department: 'Computer Science', total_marks: 45, internal_marks: 15, external_marks: 30, grade: 'F', email: 'daisy@spbs.com' }
];

export const MOCK_DEPARTMENT_DISTRIBUTION = [
    { name: 'Computer Science', value: 45, color: '#6366f1' },
    { name: 'Electrical Eng', value: 25, color: '#f59e0b' },
    { name: 'Mechanical Eng', value: 30, color: '#10b981' }
];

export const MOCK_ATTENDANCE = {
    total_percentage: 88,
    total_present: 132,
    total_absent: 18,
    course_wise: [
        { course_code: 'CS201', percentage: 92, present: 46, absent: 4 },
        { course_code: 'CS202', percentage: 85, present: 42, absent: 8 },
        { course_code: 'CS101', percentage: 78, present: 44, absent: 12 }
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
    active_users: 125,
    totalUsers: 125,
    totalStudents: 119,
    totalFaculty: 6,
    totalCourses: 5,
    database_size: '256 MB',
    last_backup: '2026-02-11 04:00 AM'
};


export const ALL_MOCK_USERS = [
    {
        "id": 1001,
        "first_name": "Karthikeyan",
        "last_name": "M",
        "role": "faculty",
        "department": "EC",
        "email": "karthikeyan@spbs.com",
        "status": "Active",
        "faculty_id": "F101"
    },
    {
        "id": 1002,
        "first_name": "Senthil",
        "last_name": "Kumar",
        "role": "faculty",
        "department": "AD",
        "email": "senthil@spbs.com",
        "status": "Active",
        "faculty_id": "F102"
    },
    {
        "id": 1003,
        "first_name": "Anitha",
        "last_name": "R",
        "role": "faculty",
        "department": "AL",
        "email": "anitha@spbs.com",
        "status": "Active",
        "faculty_id": "F103"
    },
    {
        "id": 1004,
        "first_name": "Babu",
        "last_name": "G",
        "role": "faculty",
        "department": "EE",
        "email": "babu@spbs.com",
        "status": "Active",
        "faculty_id": "F104"
    },
    {
        "id": 1005,
        "first_name": "Admin",
        "last_name": "User",
        "role": "admin",
        "department": "IT",
        "email": "admin@spbs.com",
        "status": "Active"
    },
    {
        "id": 1006,
        "first_name": "Exam",
        "last_name": "Controller",
        "role": "faculty",
        "department": "EC",
        "email": "exam@spbs.com",
        "status": "Active",
        "faculty_id": "F105"
    },
    {
        "id": 1,
        "first_name": "ABHISRI",
        "last_name": "M",
        "role": "student",
        "department": "AD",
        "email": "abhisri@spbs.com",
        "status": "Active",
        "roll_number": "EC101",
        "semester": 4
    },
    {
        "id": 2,
        "first_name": "ABINAYA",
        "last_name": "S",
        "role": "student",
        "department": "EC",
        "email": "abinaya@spbs.com",
        "status": "Active",
        "roll_number": "EC102",
        "semester": 4
    },
    {
        "id": 3,
        "first_name": "ABISHEK",
        "last_name": "KS",
        "role": "student",
        "department": "AL",
        "email": "abishek@spbs.com",
        "status": "Active",
        "roll_number": "EC103",
        "semester": 4
    },
    {
        "id": 4,
        "first_name": "AHMED ABU HURAIRAH M",
        "last_name": "H",
        "role": "student",
        "department": "EE",
        "email": "ahmedabuhurairahm@spbs.com",
        "status": "Active",
        "roll_number": "EC104",
        "semester": 4
    },
    {
        "id": 5,
        "first_name": "AJAY",
        "last_name": "A",
        "role": "student",
        "department": "AD",
        "email": "ajay@spbs.com",
        "status": "Active",
        "roll_number": "EC105",
        "semester": 4
    },
    {
        "id": 6,
        "first_name": "AKASH",
        "last_name": "S",
        "role": "student",
        "department": "EC",
        "email": "akash@spbs.com",
        "status": "Active",
        "roll_number": "EC106",
        "semester": 4
    },
    {
        "id": 7,
        "first_name": "AKSHAYA G",
        "last_name": "J",
        "role": "student",
        "department": "AL",
        "email": "akshayag@spbs.com",
        "status": "Active",
        "roll_number": "EC107",
        "semester": 4
    },
    {
        "id": 8,
        "first_name": "ANEES FATHIMA B",
        "last_name": "I",
        "role": "student",
        "department": "EE",
        "email": "aneesfathimab@spbs.com",
        "status": "Active",
        "roll_number": "EC108",
        "semester": 4
    },
    {
        "id": 9,
        "first_name": "APSARA A",
        "last_name": "R",
        "role": "student",
        "department": "AD",
        "email": "apsaraa@spbs.com",
        "status": "Active",
        "roll_number": "EC109",
        "semester": 4
    },
    {
        "id": 10,
        "first_name": "ARTHI",
        "last_name": "K",
        "role": "student",
        "department": "EC",
        "email": "arthi@spbs.com",
        "status": "Active",
        "roll_number": "EC110",
        "semester": 4
    },
    {
        "id": 11,
        "first_name": "ARUN G",
        "last_name": "R",
        "role": "student",
        "department": "AL",
        "email": "arung@spbs.com",
        "status": "Active",
        "roll_number": "EC111",
        "semester": 4
    },
    {
        "id": 12,
        "first_name": "ARUN",
        "last_name": "R",
        "role": "student",
        "department": "EE",
        "email": "arun@spbs.com",
        "status": "Active",
        "roll_number": "EC112",
        "semester": 4
    },
    {
        "id": 13,
        "first_name": "ASHIKA",
        "last_name": "A",
        "role": "student",
        "department": "AD",
        "email": "ashika@spbs.com",
        "status": "Active",
        "roll_number": "EC113",
        "semester": 4
    },
    {
        "id": 14,
        "first_name": "ASHVITHA THANYA",
        "last_name": "K",
        "role": "student",
        "department": "EC",
        "email": "ashvithathanya@spbs.com",
        "status": "Active",
        "roll_number": "EC114",
        "semester": 4
    },
    {
        "id": 15,
        "first_name": "ASHWIN KUMARAN",
        "last_name": "S",
        "role": "student",
        "department": "AL",
        "email": "ashwinkumaran@spbs.com",
        "status": "Active",
        "roll_number": "EC115",
        "semester": 4
    },
    {
        "id": 16,
        "first_name": "ATHEEQ SAQLAIN",
        "last_name": "M",
        "role": "student",
        "department": "EE",
        "email": "atheeqsaqlain@spbs.com",
        "status": "Active",
        "roll_number": "EC116",
        "semester": 4
    },
    {
        "id": 17,
        "first_name": "BALA BAVADHARANI",
        "last_name": "R",
        "role": "student",
        "department": "AD",
        "email": "balabavadharani@spbs.com",
        "status": "Active",
        "roll_number": "EC117",
        "semester": 4
    },
    {
        "id": 18,
        "first_name": "BALAJI K",
        "last_name": "A",
        "role": "student",
        "department": "EC",
        "email": "balajik@spbs.com",
        "status": "Active",
        "roll_number": "EC118",
        "semester": 4
    },
    {
        "id": 19,
        "first_name": "BARATH VIGNESH",
        "last_name": "C",
        "role": "student",
        "department": "AL",
        "email": "barathvignesh@spbs.com",
        "status": "Active",
        "roll_number": "EC119",
        "semester": 4
    },
    {
        "id": 20,
        "first_name": "BAVAN KALYAN",
        "last_name": "S",
        "role": "student",
        "department": "EE",
        "email": "bavankalyan@spbs.com",
        "status": "Active",
        "roll_number": "EC120",
        "semester": 4
    },
    {
        "id": 21,
        "first_name": "BHARANEEDHAR",
        "last_name": "S",
        "role": "student",
        "department": "AD",
        "email": "bharaneedhar@spbs.com",
        "status": "Active",
        "roll_number": "EC121",
        "semester": 4
    },
    {
        "id": 22,
        "first_name": "BHARATHKUMAR",
        "last_name": "P",
        "role": "student",
        "department": "EC",
        "email": "bharathkumar@spbs.com",
        "status": "Active",
        "roll_number": "EC122",
        "semester": 4
    },
    {
        "id": 23,
        "first_name": "BOSEVETRIVELRAM",
        "last_name": "M",
        "role": "student",
        "department": "AL",
        "email": "bosevetrivelram@spbs.com",
        "status": "Active",
        "roll_number": "EC123",
        "semester": 4
    },
    {
        "id": 24,
        "first_name": "CELSIA JUVANITTA",
        "last_name": "J",
        "role": "student",
        "department": "EE",
        "email": "celsiajuvanitta@spbs.com",
        "status": "Active",
        "roll_number": "EC124",
        "semester": 4
    },
    {
        "id": 25,
        "first_name": "DARSANI T",
        "last_name": "S",
        "role": "student",
        "department": "AD",
        "email": "darsanit@spbs.com",
        "status": "Active",
        "roll_number": "EC125",
        "semester": 4
    },
    {
        "id": 26,
        "first_name": "DEEPIKA",
        "last_name": "R",
        "role": "student",
        "department": "EC",
        "email": "deepika@spbs.com",
        "status": "Active",
        "roll_number": "EC126",
        "semester": 4
    },
    {
        "id": 27,
        "first_name": "DHANU SHRI",
        "last_name": "V",
        "role": "student",
        "department": "AL",
        "email": "dhanushri@spbs.com",
        "status": "Active",
        "roll_number": "EC127",
        "semester": 4
    },
    {
        "id": 28,
        "first_name": "DHANUSRI K R",
        "last_name": "R",
        "role": "student",
        "department": "EE",
        "email": "dhanusrikr@spbs.com",
        "status": "Active",
        "roll_number": "EC128",
        "semester": 4
    },
    {
        "id": 29,
        "first_name": "DHANUSRI",
        "last_name": "T",
        "role": "student",
        "department": "AD",
        "email": "dhanusri@spbs.com",
        "status": "Active",
        "roll_number": "EC129",
        "semester": 4
    },
    {
        "id": 30,
        "first_name": "DHARANISH S",
        "last_name": "S",
        "role": "student",
        "department": "EC",
        "email": "dharanishs@spbs.com",
        "status": "Active",
        "roll_number": "EC130",
        "semester": 4
    },
    {
        "id": 31,
        "first_name": "DHARSAN A",
        "last_name": "K",
        "role": "student",
        "department": "AL",
        "email": "dharsana@spbs.com",
        "status": "Active",
        "roll_number": "EC131",
        "semester": 4
    },
    {
        "id": 32,
        "first_name": "DHARSHINI",
        "last_name": "M",
        "role": "student",
        "department": "EE",
        "email": "dharshini@spbs.com",
        "status": "Active",
        "roll_number": "EC132",
        "semester": 4
    },
    {
        "id": 33,
        "first_name": "DIBAGAR",
        "last_name": "S",
        "role": "student",
        "department": "AD",
        "email": "dibagar@spbs.com",
        "status": "Active",
        "roll_number": "EC133",
        "semester": 4
    },
    {
        "id": 34,
        "first_name": "DINESH",
        "last_name": "S",
        "role": "student",
        "department": "EC",
        "email": "dinesh@spbs.com",
        "status": "Active",
        "roll_number": "EC134",
        "semester": 4
    },
    {
        "id": 35,
        "first_name": "DIVYA",
        "last_name": "S",
        "role": "student",
        "department": "AL",
        "email": "divya@spbs.com",
        "status": "Active",
        "roll_number": "EC135",
        "semester": 4
    },
    {
        "id": 36,
        "first_name": "DURKAIBALAN",
        "last_name": "P",
        "role": "student",
        "department": "EE",
        "email": "durkaibalan@spbs.com",
        "status": "Active",
        "roll_number": "EC136",
        "semester": 4
    },
    {
        "id": 37,
        "first_name": "ELAKKIYA",
        "last_name": "R",
        "role": "student",
        "department": "AD",
        "email": "elakkiya@spbs.com",
        "status": "Active",
        "roll_number": "EC137",
        "semester": 4
    },
    {
        "id": 38,
        "first_name": "ELAKKIYASRI",
        "last_name": "S",
        "role": "student",
        "department": "EC",
        "email": "elakkiyasri@spbs.com",
        "status": "Active",
        "roll_number": "EC138",
        "semester": 4
    },
    {
        "id": 39,
        "first_name": "GANGA",
        "last_name": "T",
        "role": "student",
        "department": "AL",
        "email": "ganga@spbs.com",
        "status": "Active",
        "roll_number": "EC139",
        "semester": 4
    },
    {
        "id": 40,
        "first_name": "GIRIDHARAN",
        "last_name": "M",
        "role": "student",
        "department": "EE",
        "email": "giridharan@spbs.com",
        "status": "Active",
        "roll_number": "EC140",
        "semester": 4
    },
    {
        "id": 41,
        "first_name": "GIRIJA",
        "last_name": "S",
        "role": "student",
        "department": "AD",
        "email": "girija@spbs.com",
        "status": "Active",
        "roll_number": "EC141",
        "semester": 4
    },
    {
        "id": 42,
        "first_name": "GOKUL PRASATH",
        "last_name": "S",
        "role": "student",
        "department": "EC",
        "email": "gokulprasath@spbs.com",
        "status": "Active",
        "roll_number": "EC142",
        "semester": 4
    },
    {
        "id": 43,
        "first_name": "GOPIKA SRI",
        "last_name": "E",
        "role": "student",
        "department": "AL",
        "email": "gopikasri@spbs.com",
        "status": "Active",
        "roll_number": "EC143",
        "semester": 4
    },
    {
        "id": 44,
        "first_name": "GOWRI",
        "last_name": "N",
        "role": "student",
        "department": "EE",
        "email": "gowri@spbs.com",
        "status": "Active",
        "roll_number": "EC144",
        "semester": 4
    },
    {
        "id": 45,
        "first_name": "HARIHARAN P",
        "last_name": "S",
        "role": "student",
        "department": "AD",
        "email": "hariharanp@spbs.com",
        "status": "Active",
        "roll_number": "EC145",
        "semester": 4
    },
    {
        "id": 46,
        "first_name": "HARIPREETHI S",
        "last_name": "M",
        "role": "student",
        "department": "EC",
        "email": "haripreethis@spbs.com",
        "status": "Active",
        "roll_number": "EC146",
        "semester": 4
    },
    {
        "id": 47,
        "first_name": "HARIRAM BHARATHAN",
        "last_name": "M",
        "role": "student",
        "department": "AL",
        "email": "harirambharathan@spbs.com",
        "status": "Active",
        "roll_number": "EC147",
        "semester": 4
    },
    {
        "id": 48,
        "first_name": "HARISH KARTHIC J",
        "last_name": "K",
        "role": "student",
        "department": "EE",
        "email": "harishkarthicj@spbs.com",
        "status": "Active",
        "roll_number": "EC148",
        "semester": 4
    },
    {
        "id": 49,
        "first_name": "HARISH KUMAR",
        "last_name": "S",
        "role": "student",
        "department": "AD",
        "email": "harishkumar@spbs.com",
        "status": "Active",
        "roll_number": "EC149",
        "semester": 4
    },
    {
        "id": 50,
        "first_name": "HARISHMITHA",
        "last_name": "R",
        "role": "student",
        "department": "EC",
        "email": "harishmitha@spbs.com",
        "status": "Active",
        "roll_number": "EC150",
        "semester": 4
    },
    {
        "id": 51,
        "first_name": "HARISURYAPRAKASH",
        "last_name": "O",
        "role": "student",
        "department": "AL",
        "email": "harisuryaprakash@spbs.com",
        "status": "Active",
        "roll_number": "EC151",
        "semester": 4
    },
    {
        "id": 52,
        "first_name": "HARSHINI",
        "last_name": "S",
        "role": "student",
        "department": "EE",
        "email": "harshini@spbs.com",
        "status": "Active",
        "roll_number": "EC152",
        "semester": 4
    },
    {
        "id": 53,
        "first_name": "HARSINI",
        "last_name": "R",
        "role": "student",
        "department": "AD",
        "email": "harsini@spbs.com",
        "status": "Active",
        "roll_number": "EC153",
        "semester": 4
    },
    {
        "id": 54,
        "first_name": "HEMA PRIYA",
        "last_name": "S",
        "role": "student",
        "department": "EC",
        "email": "hemapriya@spbs.com",
        "status": "Active",
        "roll_number": "EC154",
        "semester": 4
    },
    {
        "id": 55,
        "first_name": "HEMAPRIYA",
        "last_name": "S",
        "role": "student",
        "department": "AL",
        "email": "hemapriya@spbs.com",
        "status": "Active",
        "roll_number": "EC155",
        "semester": 4
    },
    {
        "id": 56,
        "first_name": "INDHU",
        "last_name": "S",
        "role": "student",
        "department": "EE",
        "email": "indhu@spbs.com",
        "status": "Active",
        "roll_number": "EC156",
        "semester": 4
    },
    {
        "id": 57,
        "first_name": "JAIDEV M",
        "last_name": "C",
        "role": "student",
        "department": "AD",
        "email": "jaidevm@spbs.com",
        "status": "Active",
        "roll_number": "EC157",
        "semester": 4
    },
    {
        "id": 58,
        "first_name": "JANA KIRI",
        "last_name": "G",
        "role": "student",
        "department": "EC",
        "email": "janakiri@spbs.com",
        "status": "Active",
        "roll_number": "EC158",
        "semester": 4
    },
    {
        "id": 59,
        "first_name": "JANE MYSTIKA",
        "last_name": "D",
        "role": "student",
        "department": "AL",
        "email": "janemystika@spbs.com",
        "status": "Active",
        "roll_number": "EC159",
        "semester": 4
    },
    {
        "id": 60,
        "first_name": "JAYAPRABHA GOKUL",
        "last_name": "KUMAR",
        "role": "student",
        "department": "EE",
        "email": "jayaprabhagokul@spbs.com",
        "status": "Active",
        "roll_number": "EC160",
        "semester": 4
    },
    {
        "id": 61,
        "first_name": "JAYASWAROOPA S",
        "last_name": "M",
        "role": "student",
        "department": "AD",
        "email": "jayaswaroopas@spbs.com",
        "status": "Active",
        "roll_number": "EC161",
        "semester": 4
    },
    {
        "id": 62,
        "first_name": "JEFFERY SANTO J",
        "last_name": "A",
        "role": "student",
        "department": "EC",
        "email": "jefferysantoj@spbs.com",
        "status": "Active",
        "roll_number": "EC162",
        "semester": 4
    },
    {
        "id": 63,
        "first_name": "JEYA PRASANNA",
        "last_name": "S",
        "role": "student",
        "department": "AL",
        "email": "jeyaprasanna@spbs.com",
        "status": "Active",
        "roll_number": "EC163",
        "semester": 4
    },
    {
        "id": 64,
        "first_name": "JOSHIKA",
        "last_name": "M",
        "role": "student",
        "department": "EE",
        "email": "joshika@spbs.com",
        "status": "Active",
        "roll_number": "EC164",
        "semester": 4
    },
    {
        "id": 65,
        "first_name": "JOTHIKA",
        "last_name": "S",
        "role": "student",
        "department": "AD",
        "email": "jothika@spbs.com",
        "status": "Active",
        "roll_number": "EC165",
        "semester": 4
    },
    {
        "id": 66,
        "first_name": "KABIL",
        "last_name": "M",
        "role": "student",
        "department": "EC",
        "email": "kabil@spbs.com",
        "status": "Active",
        "roll_number": "EC166",
        "semester": 4
    },
    {
        "id": 67,
        "first_name": "KABILAN",
        "last_name": "D",
        "role": "student",
        "department": "AL",
        "email": "kabilan@spbs.com",
        "status": "Active",
        "roll_number": "EC167",
        "semester": 4
    },
    {
        "id": 68,
        "first_name": "KABILAN",
        "last_name": "N",
        "role": "student",
        "department": "EE",
        "email": "kabilan@spbs.com",
        "status": "Active",
        "roll_number": "EC168",
        "semester": 4
    },
    {
        "id": 69,
        "first_name": "KABILAN",
        "last_name": "R",
        "role": "student",
        "department": "AD",
        "email": "kabilan@spbs.com",
        "status": "Active",
        "roll_number": "EC169",
        "semester": 4
    },
    {
        "id": 70,
        "first_name": "KAMALI KASTHURI",
        "last_name": "K",
        "role": "student",
        "department": "EC",
        "email": "kamalikasthuri@spbs.com",
        "status": "Active",
        "roll_number": "EC170",
        "semester": 4
    },
    {
        "id": 71,
        "first_name": "KAMALNATH",
        "last_name": "V",
        "role": "student",
        "department": "AL",
        "email": "kamalnath@spbs.com",
        "status": "Active",
        "roll_number": "EC171",
        "semester": 4
    },
    {
        "id": 72,
        "first_name": "KAMESH",
        "last_name": "S",
        "role": "student",
        "department": "EE",
        "email": "kamesh@spbs.com",
        "status": "Active",
        "roll_number": "EC172",
        "semester": 4
    },
    {
        "id": 73,
        "first_name": "KANISHKA",
        "last_name": "M",
        "role": "student",
        "department": "AD",
        "email": "kanishka@spbs.com",
        "status": "Active",
        "roll_number": "EC173",
        "semester": 4
    },
    {
        "id": 74,
        "first_name": "KARTHIKA",
        "last_name": "R",
        "role": "student",
        "department": "EC",
        "email": "karthika@spbs.com",
        "status": "Active",
        "roll_number": "EC174",
        "semester": 4
    },
    {
        "id": 75,
        "first_name": "KARTHIKEYAN",
        "last_name": "K",
        "role": "student",
        "department": "AL",
        "email": "karthikeyan@spbs.com",
        "status": "Active",
        "roll_number": "EC175",
        "semester": 4
    },
    {
        "id": 76,
        "first_name": "KATHIR V",
        "last_name": "B",
        "role": "student",
        "department": "EE",
        "email": "kathirv@spbs.com",
        "status": "Active",
        "roll_number": "EC176",
        "semester": 4
    },
    {
        "id": 77,
        "first_name": "KAVIN",
        "last_name": "R",
        "role": "student",
        "department": "AD",
        "email": "kavin@spbs.com",
        "status": "Active",
        "roll_number": "EC177",
        "semester": 4
    },
    {
        "id": 78,
        "first_name": "KAVIN",
        "last_name": "S",
        "role": "student",
        "department": "EC",
        "email": "kavin@spbs.com",
        "status": "Active",
        "roll_number": "EC178",
        "semester": 4
    },
    {
        "id": 79,
        "first_name": "KAVIYA",
        "last_name": "S",
        "role": "student",
        "department": "AL",
        "email": "kaviya@spbs.com",
        "status": "Active",
        "roll_number": "EC179",
        "semester": 4
    },
    {
        "id": 80,
        "first_name": "KAVYA",
        "last_name": "C",
        "role": "student",
        "department": "EE",
        "email": "kavya@spbs.com",
        "status": "Active",
        "roll_number": "EC180",
        "semester": 4
    },
    {
        "id": 81,
        "first_name": "KEERTHIVASAN",
        "last_name": "J",
        "role": "student",
        "department": "AD",
        "email": "keerthivasan@spbs.com",
        "status": "Active",
        "roll_number": "EC181",
        "semester": 4
    },
    {
        "id": 82,
        "first_name": "KEERTHIVASAN",
        "last_name": "S",
        "role": "student",
        "department": "EC",
        "email": "keerthivasan@spbs.com",
        "status": "Active",
        "roll_number": "EC182",
        "semester": 4
    },
    {
        "id": 83,
        "first_name": "KHARIZMA",
        "last_name": "A",
        "role": "student",
        "department": "AL",
        "email": "kharizma@spbs.com",
        "status": "Active",
        "roll_number": "EC183",
        "semester": 4
    },
    {
        "id": 84,
        "first_name": "KOUSIK A",
        "last_name": "B",
        "role": "student",
        "department": "EE",
        "email": "kousika@spbs.com",
        "status": "Active",
        "roll_number": "EC184",
        "semester": 4
    },
    {
        "id": 85,
        "first_name": "KOWSIC",
        "last_name": "S",
        "role": "student",
        "department": "AD",
        "email": "kowsic@spbs.com",
        "status": "Active",
        "roll_number": "EC185",
        "semester": 4
    },
    {
        "id": 86,
        "first_name": "KOWSIKA",
        "last_name": "D",
        "role": "student",
        "department": "EC",
        "email": "kowsika@spbs.com",
        "status": "Active",
        "roll_number": "EC186",
        "semester": 4
    },
    {
        "id": 87,
        "first_name": "LALITHKUMAR",
        "last_name": "R",
        "role": "student",
        "department": "AL",
        "email": "lalithkumar@spbs.com",
        "status": "Active",
        "roll_number": "EC187",
        "semester": 4
    },
    {
        "id": 88,
        "first_name": "LEAH AGALYA",
        "last_name": "RAJ",
        "role": "student",
        "department": "EE",
        "email": "leahagalya@spbs.com",
        "status": "Active",
        "roll_number": "EC188",
        "semester": 4
    },
    {
        "id": 89,
        "first_name": "LINGESH G",
        "last_name": "R",
        "role": "student",
        "department": "AD",
        "email": "lingeshg@spbs.com",
        "status": "Active",
        "roll_number": "EC189",
        "semester": 4
    },
    {
        "id": 90,
        "first_name": "LOHITH",
        "last_name": "R",
        "role": "student",
        "department": "EC",
        "email": "lohith@spbs.com",
        "status": "Active",
        "roll_number": "EC190",
        "semester": 4
    },
    {
        "id": 91,
        "first_name": "LUCKSHANA",
        "last_name": "VR",
        "role": "student",
        "department": "AL",
        "email": "luckshana@spbs.com",
        "status": "Active",
        "roll_number": "EC191",
        "semester": 4
    },
    {
        "id": 92,
        "first_name": "MADHANKUMAR",
        "last_name": "E",
        "role": "student",
        "department": "EE",
        "email": "madhankumar@spbs.com",
        "status": "Active",
        "roll_number": "EC192",
        "semester": 4
    },
    {
        "id": 93,
        "first_name": "MADHUBALA",
        "last_name": "N",
        "role": "student",
        "department": "AD",
        "email": "madhubala@spbs.com",
        "status": "Active",
        "roll_number": "EC193",
        "semester": 4
    },
    {
        "id": 94,
        "first_name": "MADHUMITHA",
        "last_name": "N",
        "role": "student",
        "department": "EC",
        "email": "madhumitha@spbs.com",
        "status": "Active",
        "roll_number": "EC194",
        "semester": 4
    },
    {
        "id": 95,
        "first_name": "MADHUMITHA",
        "last_name": "S",
        "role": "student",
        "department": "AL",
        "email": "madhumitha@spbs.com",
        "status": "Active",
        "roll_number": "EC195",
        "semester": 4
    },
    {
        "id": 96,
        "first_name": "MALLIHARJUN",
        "last_name": "M",
        "role": "student",
        "department": "EE",
        "email": "malliharjun@spbs.com",
        "status": "Active",
        "roll_number": "EC196",
        "semester": 4
    },
    {
        "id": 97,
        "first_name": "MANIMEGALAI",
        "last_name": "M",
        "role": "student",
        "department": "AD",
        "email": "manimegalai@spbs.com",
        "status": "Active",
        "roll_number": "EC197",
        "semester": 4
    },
    {
        "id": 98,
        "first_name": "MANISHA",
        "last_name": "D",
        "role": "student",
        "department": "EC",
        "email": "manisha@spbs.com",
        "status": "Active",
        "roll_number": "EC198",
        "semester": 4
    },
    {
        "id": 99,
        "first_name": "MANOJ",
        "last_name": "J",
        "role": "student",
        "department": "AL",
        "email": "manoj@spbs.com",
        "status": "Active",
        "roll_number": "EC199",
        "semester": 4
    },
    {
        "id": 100,
        "first_name": "MANOJ",
        "last_name": "R",
        "role": "student",
        "department": "EE",
        "email": "manoj@spbs.com",
        "status": "Active",
        "roll_number": "EC200",
        "semester": 4
    },
    {
        "id": 101,
        "first_name": "MANOJKUMAR C",
        "last_name": "S",
        "role": "student",
        "department": "AD",
        "email": "manojkumarc@spbs.com",
        "status": "Active",
        "roll_number": "EC201",
        "semester": 4
    },
    {
        "id": 102,
        "first_name": "MARISH",
        "last_name": "M",
        "role": "student",
        "department": "EC",
        "email": "marish@spbs.com",
        "status": "Active",
        "roll_number": "EC202",
        "semester": 4
    },
    {
        "id": 103,
        "first_name": "MIDUN THANIGACHALAM",
        "last_name": "SUBBARAYAN",
        "role": "student",
        "department": "AL",
        "email": "midunthanigachalam@spbs.com",
        "status": "Active",
        "roll_number": "EC203",
        "semester": 4
    },
    {
        "id": 104,
        "first_name": "MITHUN B",
        "last_name": "S",
        "role": "student",
        "department": "EE",
        "email": "mithunb@spbs.com",
        "status": "Active",
        "roll_number": "EC204",
        "semester": 4
    },
    {
        "id": 105,
        "first_name": "MOHAMED ISMAIL",
        "last_name": "T",
        "role": "student",
        "department": "AD",
        "email": "mohamedismail@spbs.com",
        "status": "Active",
        "roll_number": "EC205",
        "semester": 4
    },
    {
        "id": 106,
        "first_name": "MOHAMMAD ABDULLAH",
        "last_name": "S",
        "role": "student",
        "department": "EC",
        "email": "mohammadabdullah@spbs.com",
        "status": "Active",
        "roll_number": "EC206",
        "semester": 4
    },
    {
        "id": 107,
        "first_name": "MOHAMMED HANIFA",
        "last_name": "M",
        "role": "student",
        "department": "AL",
        "email": "mohammedhanifa@spbs.com",
        "status": "Active",
        "roll_number": "EC207",
        "semester": 4
    },
    {
        "id": 108,
        "first_name": "MOHAMMED HUSSAIN",
        "last_name": "F",
        "role": "student",
        "department": "EE",
        "email": "mohammedhussain@spbs.com",
        "status": "Active",
        "roll_number": "EC208",
        "semester": 4
    },
    {
        "id": 109,
        "first_name": "MOHIT BALAJI",
        "last_name": "M",
        "role": "student",
        "department": "AD",
        "email": "mohitbalaji@spbs.com",
        "status": "Active",
        "roll_number": "EC209",
        "semester": 4
    },
    {
        "id": 110,
        "first_name": "MONIKA",
        "last_name": "M",
        "role": "student",
        "department": "EC",
        "email": "monika@spbs.com",
        "status": "Active",
        "roll_number": "EC210",
        "semester": 4
    },
    {
        "id": 111,
        "first_name": "MONIKA SRI",
        "last_name": "K",
        "role": "student",
        "department": "AL",
        "email": "monikasri@spbs.com",
        "status": "Active",
        "roll_number": "EC211",
        "semester": 4
    },
    {
        "id": 112,
        "first_name": "MONISH",
        "last_name": "R",
        "role": "student",
        "department": "EE",
        "email": "monish@spbs.com",
        "status": "Active",
        "roll_number": "EC212",
        "semester": 4
    },
    {
        "id": 113,
        "first_name": "MUGESHKANNA S",
        "last_name": "R",
        "role": "student",
        "department": "AD",
        "email": "mugeshkannas@spbs.com",
        "status": "Active",
        "roll_number": "EC213",
        "semester": 4
    },
    {
        "id": 114,
        "first_name": "NANDHA",
        "last_name": "VISVANATHAN",
        "role": "student",
        "department": "EC",
        "email": "nandha@spbs.com",
        "status": "Active",
        "roll_number": "EC214",
        "semester": 4
    },
    {
        "id": 115,
        "first_name": "NANTHANA",
        "last_name": "C",
        "role": "student",
        "department": "AL",
        "email": "nanthana@spbs.com",
        "status": "Active",
        "roll_number": "EC215",
        "semester": 4
    },
    {
        "id": 116,
        "first_name": "NARBAVI",
        "last_name": "T",
        "role": "student",
        "department": "EE",
        "email": "narbavi@spbs.com",
        "status": "Active",
        "roll_number": "EC216",
        "semester": 4
    },
    {
        "id": 117,
        "first_name": "NARESH",
        "last_name": "S",
        "role": "student",
        "department": "AD",
        "email": "naresh@spbs.com",
        "status": "Active",
        "roll_number": "EC217",
        "semester": 4
    },
    {
        "id": 118,
        "first_name": "NAVEEN KUMAR",
        "last_name": "I",
        "role": "student",
        "department": "EC",
        "email": "naveenkumar@spbs.com",
        "status": "Active",
        "roll_number": "EC218",
        "semester": 4
    },
    {
        "id": 119,
        "first_name": "NAVEEN KUMAR K",
        "last_name": "V",
        "role": "student",
        "department": "AL",
        "email": "naveenkumark@spbs.com",
        "status": "Active",
        "roll_number": "EC219",
        "semester": 4
    }
];

export const mockStore = {
    studentsByCourse: [...MOCK_STUDENTS_BY_COURSE],
    users: [...ALL_MOCK_USERS],
    courses: [...MOCK_COURSES]
};