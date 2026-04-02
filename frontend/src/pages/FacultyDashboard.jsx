import React, { useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from '../services/authService';
import { getFacultyProfile, getClassPerformance, getStudentsByCourse, uploadMarks, getGradeDistribution } from '../services/facultyService';
import { getCourses, getDepartments, createUser } from '../services/adminService';
import Sidebar from '../components/Sidebar';
import { Users, BookOpen, AlertCircle, Edit3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const FacultyDashboard = () => {
    const user = getCurrentUser();
    const [profile, setProfile] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [stats, setStats] = useState(null);
    const [students, setStudents] = useState([]);
    const [showUpload, setShowUpload] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [marks, setMarks] = useState({ internal: '', external: '' });
    const [gradeData, setGradeData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [formData, setFormData] = useState({
        email: '',
        role: 'student',
        first_name: '',
        last_name: '',
        department: '',
        roll_number: '',
        semester: '1',
        section: 'A'
    });


    const handleCourseSelect = useCallback(async (courseId) => {
        setSelectedCourse(courseId);
        try {
            const classStats = await getClassPerformance(courseId);
            setStats(classStats);
            const studentList = await getStudentsByCourse(courseId);
            setStudents(studentList);
            const distribution = await getGradeDistribution(courseId);
            setGradeData(distribution);
        } catch (error) {
            console.error('Error switching courses:', error);
        }
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const prof = await getFacultyProfile(user.id);
            setProfile(prof);
            const coursesData = await getCourses(); // Assuming getCourses is the correct service call
            setCourses(coursesData);
            if (coursesData.length > 0) {
                // The original code passed course.id, the instruction passes the whole object.
                // Sticking to the original logic of passing ID for handleCourseSelect.
                handleCourseSelect(coursesData[0].id);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    }, [user.id, handleCourseSelect]);

    useEffect(() => {
        if (user?.id) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchData();
        }
    }, [user?.id, fetchData]);

    useEffect(() => {
        const fetchDepts = async () => {
            try {
                const depts = await getDepartments();
                setDepartments(depts);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };
        fetchDepts();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStudentSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createUser(formData);
            setMessage({ text: `${result.message}. Default Password: Welcome@123`, type: 'success' });
            if (selectedCourse) {
                handleCourseSelect(selectedCourse);
            }
            setTimeout(() => {
                setShowStudentModal(false);
                setMessage({ text: '', type: '' });
                setFormData({
                    email: '',
                    role: 'student',
                    first_name: '',
                    last_name: '',
                    department: '',
                    roll_number: '',
                    semester: '1',
                    section: 'A'
                });
            }, 3000);
        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Error creating student', type: 'error' });
        }
    };

    const handleUploadClick = (student) => {
        setSelectedStudent(student);
        setMarks({ internal: '', external: '' });
        setShowUpload(true);
    };

    const filteredStudents = students.filter(s =>
        s.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.roll_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        try {
            await uploadMarks({
                student_id: selectedStudent.id,
                course_id: selectedCourse,
                internal_marks: marks.internal,
                external_marks: marks.external,
                semester: courses.find(c => c.id === selectedCourse)?.semester,
                academic_year: '2025-26'
            });
            setShowUpload(false);
            handleCourseSelect(selectedCourse);
            alert('Marks uploaded successfully!');
        } catch {
            alert('Error uploading marks');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Sidebar title="SPBS Faculty" />

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px' }}>
                <header style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '28px' }}>Welcome, Prof. {profile?.last_name}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>{profile?.designation} | {profile?.department}</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '40px' }}>
                    <div className="card">
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Average Performance</h3>
                        <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)' }}>{parseFloat(stats?.average_marks || 0).toFixed(1)}%</p>
                    </div>
                    <div className="card">
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Highest Score</h3>
                        <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e' }}>{stats?.highest_marks || 0}%</p>
                    </div>
                    <div className="card">
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Students at Risk</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--error)' }}>
                            <AlertCircle size={24} />
                            <span style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats?.risk_count || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Course Selection & Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px' }}>Class Performance - {courses.find(c => c.id === selectedCourse)?.course_code}</h3>
                    <select
                        style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }}
                        onChange={(e) => handleCourseSelect(parseInt(e.target.value))}
                        value={selectedCourse || ''}
                    >
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.course_code}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px', marginBottom: '32px' }}>
                    {/* Student Performance Table */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '16px' }}>Student Performance</h3>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    onClick={() => setShowStudentModal(true)}
                                    style={{
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        color: 'var(--primary)',
                                        border: '1px solid var(--primary)',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        fontWeight: 'bold'
                                    }}>
                                    + Add Student
                                </button>
                                <div style={{ position: 'relative', width: '200px' }}>
                                    <input
                                        type="text"
                                        placeholder="Search student..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px 12px',
                                            background: 'var(--bg-main)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '8px',
                                            color: 'white',
                                            fontSize: '13px'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {message.text && (
                            <div style={{
                                padding: '12px',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                fontSize: '13px',
                                background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: message.type === 'success' ? '#22c55e' : '#ef4444',
                                border: `1px solid ${message.type === 'success' ? '#22c55e' : '#ef4444'}`
                            }}>
                                {message.text}
                            </div>
                        )}
                        <div style={{ overflowX: 'auto', maxHeight: '400px', overflowY: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '13px' }}>
                                        <th style={{ padding: '12px' }}>Student</th>
                                        <th style={{ padding: '12px' }}>Marks (I/E)</th>
                                        <th style={{ padding: '12px' }}>Total</th>
                                        <th style={{ padding: '12px' }}>Status</th>
                                        <th style={{ padding: '12px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map(student => (
                                        <tr key={student.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '12px' }}>
                                                <div 
                                                    style={{ fontWeight: '500', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
                                                    onClick={() => { setSelectedStudentDetails(student); setShowDetailsModal(true); }}
                                                >
                                                    {student.first_name} {student.last_name}
                                                </div>
                                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{student.roll_number}</div>
                                            </td>
                                            <td style={{ padding: '12px' }}>{student.internal_marks || '-'} / {student.external_marks || '-'}</td>
                                            <td style={{ padding: '12px', fontWeight: 'bold' }}>{student.total_marks || '-'}</td>
                                            <td style={{ padding: '12px' }}>
                                                <span style={{
                                                    padding: '4px 10px',
                                                    borderRadius: '20px',
                                                    fontSize: '11px',
                                                    background: student.total_marks >= 60 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                    color: student.total_marks >= 60 ? '#22c55e' : 'var(--error)'
                                                }}>
                                                    {student.total_marks >= 60 ? 'Satisfactory' : 'At Risk'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px' }}>
                                                <button onClick={() => handleUploadClick(student)} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}>
                                                    <Edit3 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Grade Distribution */}
                    <div className="card">
                        <h3 style={{ marginBottom: '24px' }}>Grade Distribution</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={gradeData}
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="count"
                                >
                                    {gradeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <ReTooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {gradeData.map(item => (
                                <div key={item.grade} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }}></div>
                                    <span>{item.grade}: {item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enrollment Stats */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <Users size={20} style={{ color: 'var(--primary)' }} />
                        <h3>Enrollment Analysis</h3>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                        <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-main)' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>Total Students</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{students.length}</div>
                        </div>
                        <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-main)' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>Male / Female</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>65% / 35%</div>
                        </div>
                        <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-main)' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>Average Attendance</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>82%</div>
                        </div>
                        <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-main)' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>Submission Rate</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e' }}>98%</div>
                        </div>
                    </div>
                </div>

                {/* Upload Modal */}
                {showUpload && (
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                        <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '440px' }}>
                            <h2 style={{ marginBottom: '8px' }}>Update Marks</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>{selectedStudent?.first_name} {selectedStudent?.last_name} ({selectedStudent?.roll_number})</p>
                            <form onSubmit={handleUploadSubmit}>
                                <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>Internal (30)</label>
                                        <input type="number" max="30" style={{ width: '100%', padding: '12px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '8px' }} value={marks.internal} onChange={e => setMarks({ ...marks, internal: e.target.value })} required />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>External (70)</label>
                                        <input type="number" max="70" style={{ width: '100%', padding: '12px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '8px' }} value={marks.external} onChange={e => setMarks({ ...marks, external: e.target.value })} required />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <button type="button" onClick={() => setShowUpload(false)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'white' }}>Cancel</button>
                                    <button type="submit" style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 'bold' }}>Save Marks</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Student Modal */}
            {showStudentModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div className="card" style={{ width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ margin: 0 }}>Add New Student</h2>
                            <button onClick={() => setShowStudentModal(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '24px' }}>&times;</button>
                        </div>

                        <form onSubmit={handleStudentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>First Name</label>
                                    <input type="text" name="first_name" required value={formData.first_name} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Last Name</label>
                                    <input type="text" name="last_name" required value={formData.last_name} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                            </div>

                            <div className="form-group">
                                <label>Department (Separate)</label>
                                <select name="department" required value={formData.department} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }}>
                                    <option value="">Select Department</option>
                                    {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Electrical Engineering">Electrical Engineering</option>
                                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Roll Number</label>
                                <input type="text" name="roll_number" required value={formData.roll_number} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Semester</label>
                                    <input type="number" name="semester" min="1" max="8" required value={formData.semester} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Section</label>
                                    <input type="text" name="section" value={formData.section} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                <button type="submit" className="login-btn" style={{ flex: 1 }}>Add Student</button>
                                <button type="button" onClick={() => setShowStudentModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'transparent', color: 'white', cursor: 'pointer' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Student Details Modal */}
            {showDetailsModal && selectedStudentDetails && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div className="card" style={{ width: '500px', maxHeight: '90vh', overflowY: 'auto', padding: '0', borderRadius: '16px' }}>
                        <div style={{ height: '100px', background: 'transparent', position: 'relative', borderBottom: '1px solid var(--border-color)' }}>
                            <button onClick={() => setShowDetailsModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px', borderRadius: '50%', display: 'flex' }}><span style={{ fontSize: '20px', lineHeight: '1' }}>&times;</span></button>
                        </div>
                        <div style={{ padding: '0 32px 32px', marginTop: '-40px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', marginBottom: '24px' }}>
                                <div style={{
                                    width: '80px', height: '80px', borderRadius: '20px', background: 'var(--bg-card)', 
                                    border: '4px solid var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                    fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                                }}>
                                    {selectedStudentDetails.first_name[0]}{selectedStudentDetails.last_name[0]}
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    <h2 style={{ margin: '0 0 4px 0', fontSize: '22px' }}>{selectedStudentDetails.first_name} {selectedStudentDetails.last_name}</h2>
                                    <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', background: 'var(--bg-main)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
                                        {selectedStudentDetails.roll_number}
                                    </span>
                                </div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                                <div>
                                    <h4 style={{ fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Academic Information</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                        <div>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Department</span>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{selectedStudentDetails.department || 'N/A'}</div>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Semester</span>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>Semester {selectedStudentDetails.semester || 'N/A'}</div>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Section</span>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{selectedStudentDetails.section || 'A'}</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 style={{ fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Course Performance</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                        <div>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Internal Marks</span>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{selectedStudentDetails.internal_marks || '0'} / 30</div>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>External Marks</span>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{selectedStudentDetails.external_marks || '0'} / 70</div>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Total Marks</span>
                                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--primary)' }}>{selectedStudentDetails.total_marks || '0'}</div>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Current Grade</span>
                                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: selectedStudentDetails.total_marks >= 60 ? '#22c55e' : 'var(--error)' }}>
                                                {selectedStudentDetails.grade || 'NA'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacultyDashboard;
