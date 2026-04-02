import React, { useState, useEffect, useCallback } from 'react';
import { getCourses, getDepartments } from '../services/adminService';
import { getStudentsByCourse, getAllStudents, enrollStudent } from '../services/facultyService';
import Sidebar from '../components/Sidebar';
import { Search, Filter, Download, UserPlus, MoreVertical } from 'lucide-react';

const Students = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [allStudents, setAllStudents] = useState([]);
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedStudentToEnroll, setSelectedStudentToEnroll] = useState('');
    const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const fetchCourses = useCallback(async () => {
        try {
            const data = await getCourses();
            setCourses(data);
            if (data.length > 0) {
                setSelectedCourse(data[0].id);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }, []);

    const fetchStudents = useCallback(async (courseId) => {
        if (!courseId) return;
        try {
            const data = await getStudentsByCourse(courseId);
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCourses();
    }, [fetchCourses]);

    useEffect(() => {
        if (selectedCourse) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchStudents(selectedCourse);
        }
    }, [selectedCourse, fetchStudents]);

    const filteredStudents = students.filter(s =>
        s.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.roll_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const fetchDeptsAndStudents = async () => {
            try {
                const [depts, studentsData] = await Promise.all([
                    getDepartments(),
                    getAllStudents()
                ]);
                setDepartments(depts);
                setAllStudents(studentsData);
            } catch (error) {
                console.error('Error fetching data for enrollment:', error);
            }
        };
        fetchDeptsAndStudents();
    }, []);

    const handleEnrollSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCourse || !selectedStudentToEnroll) {
            setMessage({ text: 'Please select a student and ensure a course is selected.', type: 'error' });
            return;
        }
        try {
            await enrollStudent(selectedStudentToEnroll, selectedCourse);
            setMessage({ text: `Student successfully added to course!`, type: 'success' });
            fetchStudents(selectedCourse);

            setTimeout(() => {
                setShowModal(false);
                setMessage({ text: '', type: '' });
                setSelectedDept('');
                setSelectedStudentToEnroll('');
            }, 3000);
        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Error enrolling student', type: 'error' });
        }
    };

    const studentsInSelectedDept = allStudents.filter(s => s.department === selectedDept);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Sidebar title="SPBS Faculty" />

            <div style={{ flex: 1, padding: '40px' }}>
                <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Student Directory</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Manage and view student performance across your courses</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={() => setShowModal(true)}
                            style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                color: 'var(--primary)',
                                border: '1px solid var(--primary)',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}>
                            <UserPlus size={18} /> Add Student
                        </button>
                        <button style={{
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            <Download size={18} /> Export List
                        </button>
                    </div>
                </header>

                {message.text && (
                    <div style={{
                        padding: '16px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: message.type === 'success' ? '#22c55e' : '#ef4444',
                        border: `1px solid ${message.type === 'success' ? '#22c55e' : '#ef4444'}`
                    }}>
                        {message.text}
                    </div>
                )}

                <div className="card" style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search by name or roll number..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    background: 'var(--bg-main)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '10px',
                                    color: 'white'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Filter size={18} style={{ color: 'var(--text-muted)' }} />
                            <select
                                value={selectedCourse || ''}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                style={{
                                    padding: '12px 16px',
                                    background: 'var(--bg-main)',
                                    color: 'white',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '10px',
                                    minWidth: '150px'
                                }}
                            >
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.course_code} - {course.course_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ padding: '20px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px' }}>STUDENT</th>
                                <th style={{ padding: '20px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px' }}>INTERNAL</th>
                                <th style={{ padding: '20px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px' }}>EXTERNAL</th>
                                <th style={{ padding: '20px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px' }}>TOTAL</th>
                                <th style={{ padding: '20px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px' }}>GRADE</th>
                                <th style={{ padding: '20px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px' }}>BENCHMARK</th>
                                <th style={{ padding: '20px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px' }}>STATUS</th>
                                <th style={{ padding: '20px 24px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} className="table-row-hover">
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                {student.first_name[0]}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600' }}>{student.first_name} {student.last_name}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{student.roll_number}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>{student.internal_marks || '0'}/30</td>
                                    <td style={{ padding: '16px 24px' }}>{student.external_marks || '0'}/70</td>
                                    <td style={{ padding: '16px 24px', fontWeight: 'bold', color: 'var(--primary)' }}>{student.total_marks || '0'}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{ fontWeight: '600' }}>{student.grade || 'NA'}</span>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{student.bench_marking || 'NA'}</span>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            background: student.total_marks >= 60 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: student.total_marks >= 60 ? '#22c55e' : 'var(--error)'
                                        }}>
                                            {student.total_marks >= 60 ? 'Satisfactory' : 'At Risk'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <button 
                                            onClick={() => { setSelectedStudentDetails(student); setShowDetailsModal(true); }}
                                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '8px', borderRadius: '50%', '&:hover': { background: 'rgba(255,255,255,0.1)' } }}
                                            title="View Details"
                                        >
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Student Modal */}
            {showModal && (
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
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '24px' }}>&times;</button>
                        </div>

                        <form onSubmit={handleEnrollSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="form-group">
                                <label>1. Select Department</label>
                                <select required value={selectedDept} onChange={e => { setSelectedDept(e.target.value); setSelectedStudentToEnroll(''); }} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }}>
                                    <option value="">Choose Department</option>
                                    {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>2. Select Student</label>
                                <select required value={selectedStudentToEnroll} onChange={e => setSelectedStudentToEnroll(e.target.value)} disabled={!selectedDept} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)', opacity: !selectedDept ? 0.5 : 1 }}>
                                    <option value="">Choose Student</option>
                                    {studentsInSelectedDept.map(s => (
                                        <option key={s.id} value={s.id}>{s.first_name} {s.last_name} ({s.roll_number})</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.3)', marginTop: '8px' }}>
                                <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-muted)' }}>
                                    This will add the selected student to <strong>{courses.find(c => c.id === selectedCourse)?.course_code}</strong>.
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                <button type="submit" className="login-btn" style={{ flex: 1 }}>Add Student</button>
                                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'transparent', color: 'white', cursor: 'pointer' }}>Cancel</button>
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
                                        <div>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Current Arrears</span>
                                            <div style={{ fontSize: '14px', fontWeight: '500', color: selectedStudentDetails.current_arrears > 0 ? 'var(--error)' : 'var(--text-main)' }}>
                                                {selectedStudentDetails.current_arrears || '0'}
                                            </div>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Benchmarking</span>
                                            <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--primary)' }}>
                                                {selectedStudentDetails.bench_marking || 'NA'}
                                            </div>
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

export default Students;
