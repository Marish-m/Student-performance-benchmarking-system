import React, { useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from '../services/authService';
import { getCourses, addCourse, updateCourse, deleteCourse, getSystemStats } from '../services/adminService';
import Sidebar from '../components/Sidebar';
import { Plus, Activity, HardDrive, ShieldCheck, Database, RefreshCw, BookOpen, Users, Edit, Trash2, Clock } from 'lucide-react';

const AdminDashboard = () => {
    const user = getCurrentUser();
    const [courses, setCourses] = useState([]);
    const [systemStats, setSystemStats] = useState(null);
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [newCourse, setNewCourse] = useState({
        course_code: '',
        course_name: '',
        department: '',
        semester: 1,
        credits: 3
    });
    const [editCourse, setEditCourse] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const fetchCourses = useCallback(async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    const fetchSystemStats = useCallback(async () => {
        try {
            const stats = await getSystemStats();
            setSystemStats(stats);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCourses();
        fetchSystemStats();
    }, [fetchCourses, fetchSystemStats]);

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            await addCourse(newCourse);
            setShowAddCourse(false);
            fetchCourses();
            fetchSystemStats();
            setNewCourse({ course_code: '', course_name: '', department: '', semester: 1, credits: 3 });
        } catch {
            alert('Error adding course');
        }
    };

    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            await updateCourse(editCourse.id, editCourse);
            setEditCourse(null);
            fetchCourses();
            fetchSystemStats();
        } catch {
            alert('Error updating course');
        }
    };

    const handleDeleteCourse = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await deleteCourse(id);
            fetchCourses();
            fetchSystemStats();
        } catch {
            alert('Error deleting course');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Sidebar title="SPBS Admin" />

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px' }}>System Administration</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Welcome, {user?.username} | Control Panel</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ background: 'var(--bg-card)', padding: '10px 20px', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '15px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Clock size={16} style={{ color: 'var(--primary)' }} />
                            <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                        </div>
                        <button className="login-btn" style={{ width: 'auto', padding: '10px 24px', fontWeight: '600' }} onClick={() => setShowAddCourse(true)}>
                            <Plus size={18} style={{ marginRight: '8px' }} /> New Course
                        </button>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
                    <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.05 }}>
                            <BookOpen size={80} />
                        </div>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>COURSES</h3>
                        <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{systemStats?.totalCourses || courses.length}</p>
                    </div>
                    <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.05 }}>
                            <Users size={80} />
                        </div>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>STUDENTS</h3>
                        <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{systemStats?.totalStudents || 0}</p>
                    </div>
                    <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.05 }}>
                            <Users size={80} />
                        </div>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>FACULTY</h3>
                        <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{systemStats?.totalFaculty || 0}</p>
                    </div>
                    <div className="card">
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>SYSTEM HEALTH</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', marginTop: '12px', marginBottom: '4px' }}>
                            <ShieldCheck size={20} />
                            <span style={{ fontWeight: 'bold' }}>{systemStats?.server_status || 'Healthy'}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Uptime: {systemStats?.uptime || '15d 4h'}</div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
                    {/* Recent Courses Table */}
                    <div className="card">
                        <h3 style={{ marginBottom: '20px' }}>Course Management</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '14px' }}>
                                    <th style={{ padding: '12px' }}>Code</th>
                                    <th style={{ padding: '12px' }}>Course Name</th>
                                    <th style={{ padding: '12px' }}>Credits</th>
                                    <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.slice(-7).reverse().map(course => (
                                    <tr key={course.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '12px', fontWeight: '600' }}>{course.course_code}</td>
                                        <td style={{ padding: '12px' }}>{course.course_name}</td>
                                        <td style={{ padding: '12px' }}>{course.credits}</td>
                                        <td style={{ padding: '12px', textAlign: 'right' }}>
                                            <button onClick={() => setEditCourse(course)} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginRight: '8px' }}>
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDeleteCourse(course.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* System Health Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div className="card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                                <Activity size={20} style={{ color: 'var(--primary)' }} />
                                <h3>Infrastructure Health</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <Database size={24} style={{ color: 'var(--text-muted)' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
                                            <span>Database Capacity</span>
                                            <span>{systemStats?.database_size} / 1 GB</span>
                                        </div>
                                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: '25%', height: '100%', background: 'var(--primary)' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <HardDrive size={24} style={{ color: 'var(--text-muted)' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '14px', marginBottom: '4px' }}>Last System Backup</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <RefreshCw size={12} /> {systemStats?.last_backup}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benchmark Info */}
                        <div style={{ background: 'rgba(99, 102, 241, 0.05)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                            <h3 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '16px' }}>Benchmarking Active</h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Comparison threshold is currently set to **60%** of class average. Standard deviations are calculated nightly at 02:00 AM.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Add Course Modal */}
                {showAddCourse && (
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
                        <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '500px', border: '1px solid var(--border-color)' }}>
                            <h2 style={{ marginBottom: '24px' }}>Create New Course</h2>
                            <form onSubmit={handleAddCourse}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <input placeholder="Course Code (e.g. CS201)" style={{ gridColumn: 'span 2', width: '100%', padding: '14px', marginBottom: '16px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '12px' }} value={newCourse.course_code} onChange={e => setNewCourse({ ...newCourse, course_code: e.target.value })} required />
                                    <input placeholder="Course Name" style={{ gridColumn: 'span 2', width: '100%', padding: '14px', marginBottom: '16px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '12px' }} value={newCourse.course_name} onChange={e => setNewCourse({ ...newCourse, course_name: e.target.value })} required />
                                    <input placeholder="Department" style={{ gridColumn: 'span 2', width: '100%', padding: '14px', marginBottom: '16px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '12px' }} value={newCourse.department} onChange={e => setNewCourse({ ...newCourse, department: e.target.value })} required />
                                    <input type="number" placeholder="Semester" style={{ width: '100%', padding: '14px', marginBottom: '16px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '12px' }} value={newCourse.semester} onChange={e => setNewCourse({ ...newCourse, semester: e.target.value })} required />
                                    <input type="number" placeholder="Credits" style={{ width: '100%', padding: '14px', marginBottom: '16px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '12px' }} value={newCourse.credits} onChange={e => setNewCourse({ ...newCourse, credits: e.target.value })} required />
                                </div>
                                <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                                    <button type="button" onClick={() => setShowAddCourse(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'transparent', color: 'white', border: '1px solid var(--border-color)', fontWeight: '600' }}>Cancel</button>
                                    <button type="submit" style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '600' }}>Create Course</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Course Modal */}
                {editCourse && (
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
                        <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '500px', border: '1px solid var(--border-color)' }}>
                            <h2 style={{ marginBottom: '24px' }}>Edit Course</h2>
                            <form onSubmit={handleUpdateCourse}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <input placeholder="Course Code (e.g. CS201)" style={{ gridColumn: 'span 2', width: '100%', padding: '14px', marginBottom: '16px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '12px' }} value={editCourse.course_code} onChange={e => setEditCourse({ ...editCourse, course_code: e.target.value })} required />
                                    <input placeholder="Course Name" style={{ gridColumn: 'span 2', width: '100%', padding: '14px', marginBottom: '16px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '12px' }} value={editCourse.course_name} onChange={e => setEditCourse({ ...editCourse, course_name: e.target.value })} required />
                                    <input placeholder="Department" style={{ gridColumn: 'span 2', width: '100%', padding: '14px', marginBottom: '16px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '12px' }} value={editCourse.department} onChange={e => setEditCourse({ ...editCourse, department: e.target.value })} required />
                                    <input type="number" placeholder="Semester" style={{ width: '100%', padding: '14px', marginBottom: '16px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '12px' }} value={editCourse.semester} onChange={e => setEditCourse({ ...editCourse, semester: e.target.value })} required />
                                    <input type="number" placeholder="Credits" style={{ width: '100%', padding: '14px', marginBottom: '16px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '12px' }} value={editCourse.credits} onChange={e => setEditCourse({ ...editCourse, credits: e.target.value })} required />
                                </div>
                                <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                                    <button type="button" onClick={() => setEditCourse(null)} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'transparent', color: 'white', border: '1px solid var(--border-color)', fontWeight: '600' }}>Cancel</button>
                                    <button type="submit" style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '600' }}>Update Course</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
