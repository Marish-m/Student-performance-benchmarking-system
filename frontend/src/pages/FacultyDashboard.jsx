import React, { useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from '../services/authService';
import { getFacultyProfile, getClassPerformance, getStudentsByCourse, uploadMarks, getGradeDistribution } from '../services/facultyService';
import { getCourses } from '../services/adminService';
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
                        <div style={{ overflowX: 'auto', maxHeight: '400px', overflowY: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '13px' }}>
                                        <th style={{ padding: '12px' }}>Student</th>
                                        <th style={{ padding: '12px' }}>Marks (I/E)</th>
                                        <th style={{ padding: '12px' }}>Status</th>
                                        <th style={{ padding: '12px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map(student => (
                                        <tr key={student.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '12px' }}>
                                                <div style={{ fontWeight: '500' }}>{student.first_name} {student.last_name}</div>
                                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{student.roll_number}</div>
                                            </td>
                                            <td style={{ padding: '12px' }}>{student.internal_marks || '-'} / {student.external_marks || '-'}</td>
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
        </div>
    );
};

export default FacultyDashboard;
