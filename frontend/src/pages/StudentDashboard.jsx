import React, { useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from '../services/authService';
import { getStudentProfile, getAttendance, getStudentPerformance, getRecentActivities } from '../services/studentService';
import Sidebar from '../components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { AlertCircle, Clock, Calendar, CheckCircle, FileText } from 'lucide-react';

const StudentDashboard = () => {
    const user = getCurrentUser();
    const [profile, setProfile] = useState(null);
    const [performanceData, setPerformanceData] = useState([]);
    const [attendance, setAttendance] = useState(null);
    const [activities, setActivities] = useState([]);
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const profData = await getStudentProfile(user.id);
            setProfile(profData);
            const perfData = await getStudentPerformance(user.id);
            setPerformanceData(perfData);
            const attendanceData = await getAttendance(user.id);
            setAttendance(attendanceData);
            const activities = await getRecentActivities();
            setActivities(activities);
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    }, [user.id]);

    useEffect(() => {
        if (user?.id) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchData();
        }
    }, [user?.id, fetchData]);


    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Sidebar title="SPBS Student" />

            <div style={{ flex: 1, padding: '40px' }}>
                <header style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '28px' }}>Hi, {profile?.first_name} {profile?.last_name}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Roll No: {profile?.roll_number} | {profile?.department} | Arrears: {profile?.current_arrears || 0}</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
                    {/* Main Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                        <div
                            className="card"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowAttendanceModal(true)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary)', marginBottom: '12px' }}>
                                <Calendar size={20} />
                                <span style={{ fontSize: '14px', fontWeight: '600' }}>TOTAL ATTENDANCE</span>
                            </div>
                            <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{attendance?.total_percentage}%</p>
                            <div style={{ marginTop: '12px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: `${attendance?.total_percentage}%`, height: '100%', background: 'var(--primary)' }}></div>
                            </div>
                            <div style={{ fontSize: '12px', marginTop: '12px', color: 'var(--text-muted)' }}>
                                Click to view daily breakdown
                            </div>
                        </div>
                        <div
                            className="card"
                            style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                            onClick={() => setShowCourseModal(true)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#22c55e', marginBottom: '12px' }}>
                                <CheckCircle size={20} />
                                <span style={{ fontSize: '14px', fontWeight: '600' }}>COURSES STATUS</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <p style={{ fontSize: '32px', fontWeight: 'bold' }}>
                                    {performanceData.filter(p => p.grade !== 'F').length}
                                </p>
                                <span style={{ color: 'var(--text-muted)' }}>/{performanceData.length} Passed</span>
                            </div>
                            <div style={{ fontSize: '12px', marginTop: '8px', color: 'var(--text-muted)' }}>
                                Click to view details
                            </div>
                        </div>
                    </div>

                    {/* Notifications Brief */}
                    <div
                        className="card"
                        style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                        onClick={() => setShowActionModal(true)}
                    >
                        <h3 style={{ fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Action Required <span style={{ padding: '2px 8px', borderRadius: '12px', background: 'var(--error)', fontSize: '12px' }}>{performanceData.filter(p => p.total_marks < p.class_average).length}</span>
                        </h3>
                        {performanceData.filter(p => p.total_marks < p.class_average).length > 0 ? (
                            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                                <AlertCircle size={14} style={{ color: 'var(--error)', marginRight: '4px', verticalAlign: 'middle' }} />
                                Below average in {performanceData.filter(p => p.total_marks < p.class_average).length} subjects.
                                <div style={{ marginTop: '8px', color: 'var(--primary)', fontSize: '12px' }}>Click to view details &rarr;</div>
                            </div>
                        ) : (
                            <div style={{ color: '#22c55e', fontSize: '14px' }}>
                                <CheckCircle size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                All scores are above average!
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Performance Charts */}
                        <div className="card">
                            <h3 style={{ marginBottom: '20px' }}>Score Benchmarking</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                    <XAxis dataKey="course_code" stroke="var(--text-muted)" />
                                    <YAxis stroke="var(--text-muted)" />
                                    <Tooltip
                                        contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                                        itemStyle={{ color: 'white' }}
                                    />
                                    <Bar dataKey="total_marks" name="Personal Score" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="class_average" name="Class Average" fill="var(--text-muted)" radius={[4, 4, 0, 0]} />
                                    <Legend />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Recent Activity Feed */}
                        <div className="card">
                            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Clock size={20} /> Recent Activities
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {activities.map(act => (
                                    <div key={act.id} style={{ display: 'flex', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <FileText size={18} style={{ color: 'var(--primary)' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <h4 style={{ fontSize: '15px' }}>{act.title}</h4>
                                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{act.time}</span>
                                            </div>
                                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{act.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Course Wise Attendance */}
                        <div className="card">
                            <h3 style={{ marginBottom: '20px' }}>Course Attendance</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {attendance?.course_wise.map(course => (
                                    <div key={course.course_code}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                                            <span>{course.course_code}</span>
                                            <span style={{ color: course.percentage < 75 ? 'var(--error)' : 'var(--text-main)' }}>{course.percentage}%</span>
                                        </div>
                                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${course.percentage}%`,
                                                height: '100%',
                                                background: course.percentage < 75 ? 'var(--error)' : 'var(--primary)'
                                            }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Subject Insights Summary */}
                        <div className="card">
                            <h3 style={{ marginBottom: '20px' }}>Quick Insights</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {performanceData.map(p => (
                                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>{p.course_code}</span>
                                        <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '10px', background: p.total_marks >= p.class_average ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: p.total_marks >= p.class_average ? '#22c55e' : 'var(--error)' }}>
                                            {p.total_marks >= p.class_average ? 'Strong' : 'Weak'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Details Modal */}
                {showCourseModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        backdropFilter: 'blur(8px)'
                    }} onClick={() => setShowCourseModal(false)}>
                        <div
                            className="card"
                            style={{
                                width: '90%',
                                maxWidth: '600px',
                                maxHeight: '80vh',
                                overflowY: 'auto',
                                position: 'relative'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h2 style={{ fontSize: '20px' }}>Course Performance Inventory</h2>
                                <button
                                    onClick={() => setShowCourseModal(false)}
                                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '24px' }}
                                >&times;</button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <h4 style={{ color: '#22c55e', borderBottom: '1px solid rgba(34, 197, 94, 0.2)', paddingBottom: '8px' }}>Passed Courses</h4>
                                {performanceData.filter(p => p.grade !== 'F').map(p => (
                                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '8px' }}>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{p.course_name}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{p.course_code}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: '700', color: '#22c55e' }}>{p.grade}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Score: {p.total_marks}</div>
                                        </div>
                                    </div>
                                ))}

                                {performanceData.filter(p => p.grade === 'F').length > 0 && (
                                    <>
                                        <h4 style={{ color: 'var(--error)', borderBottom: '1px solid rgba(239, 68, 68, 0.2)', paddingBottom: '8px', marginTop: '16px' }}>Arrears / Failed</h4>
                                        {performanceData.filter(p => p.grade === 'F').map(p => (
                                            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px' }}>
                                                <div>
                                                    <div style={{ fontWeight: '600' }}>{p.course_name}</div>
                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{p.course_code}</div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontWeight: '700', color: 'var(--error)' }}>{p.grade}</div>
                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Score: {p.total_marks}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Required Modal */}
                {showActionModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        backdropFilter: 'blur(8px)'
                    }} onClick={() => setShowActionModal(false)}>
                        <div
                            className="card"
                            style={{
                                width: '90%',
                                maxWidth: '600px',
                                maxHeight: '80vh',
                                overflowY: 'auto',
                                position: 'relative',
                                border: '1px solid rgba(239, 68, 68, 0.2)'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <AlertCircle color="var(--error)" size={24} />
                                    <h2 style={{ fontSize: '20px' }}>Subject Improvement Plan</h2>
                                </div>
                                <button
                                    onClick={() => setShowActionModal(false)}
                                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '24px' }}
                                >&times;</button>
                            </div>

                            <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '14px' }}>
                                The following subjects are currently below the class average. Consistent effort is recommended to match or exceed benchmarking standards.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {performanceData.filter(p => p.total_marks < p.class_average).map(p => (
                                    <div key={p.id} style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <div>
                                                <div style={{ fontWeight: '700', fontSize: '16px' }}>{p.course_name}</div>
                                                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Course Code: {p.course_code}</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--error)' }}>Gap: {p.class_average - p.total_marks} Marks</div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Target: {p.class_average}</div>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '12px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                                                <span>Your Score: {p.total_marks}</span>
                                                <span>Average: {p.class_average}</span>
                                            </div>
                                            <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                                                <div style={{ width: `${p.total_marks}%`, height: '100%', background: 'var(--error)', position: 'absolute', left: 0, zIndex: 2 }}></div>
                                                <div style={{ width: `${p.class_average}%`, height: '100%', background: 'rgba(255,255,255,0.1)', position: 'absolute', left: 0, zIndex: 1 }}></div>
                                            </div>
                                        </div>

                                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '6px' }}>
                                            <strong>Recommendation:</strong> Review {p.course_name} study materials and consult with faculty to address the {p.class_average - p.total_marks}% performance gap.
                                        </div>
                                    </div>
                                ))}

                                {performanceData.filter(p => p.total_marks < p.class_average).length === 0 && (
                                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                        <CheckCircle size={48} color="#22c55e" style={{ marginBottom: '16px', opacity: 0.5 }} />
                                        <p>Excellent! You are performing above the class average in all subjects.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Attendance Details Modal */}
                {showAttendanceModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        backdropFilter: 'blur(8px)'
                    }} onClick={() => setShowAttendanceModal(false)}>
                        <div
                            className="card"
                            style={{
                                width: '90%',
                                maxWidth: '600px',
                                maxHeight: '80vh',
                                overflowY: 'auto',
                                position: 'relative',
                                background: 'var(--bg-card)'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Calendar color="var(--primary)" size={24} />
                                    <h2 style={{ fontSize: '20px' }}>Full Attendance Report</h2>
                                </div>
                                <button
                                    onClick={() => setShowAttendanceModal(false)}
                                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '24px' }}
                                >&times;</button>
                            </div>

                            {/* Summary Box */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '20px',
                                marginBottom: '32px',
                                background: 'rgba(255,255,255,0.02)',
                                padding: '24px',
                                borderRadius: '16px',
                                border: '1px solid var(--border-color)'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ color: '#22c55e', fontSize: '28px', fontWeight: '800' }}>{attendance?.total_present}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Days Present</div>
                                </div>
                                <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                                    <div style={{ color: 'var(--error)', fontSize: '28px', fontWeight: '800' }}>{attendance?.total_absent}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Days Absent</div>
                                </div>
                            </div>

                            <h4 style={{ marginBottom: '20px', color: 'var(--text-main)', fontSize: '15px' }}>Course-wise Attendance</h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {attendance?.course_wise.map(course => (
                                    <div key={course.course_code} style={{
                                        padding: '16px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                            <div>
                                                <div style={{ fontWeight: '700' }}>{course.course_code}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Class Attendance</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontWeight: '700', color: course.percentage < 75 ? 'var(--error)' : 'var(--primary)' }}>
                                                    {course.percentage}%
                                                </div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                                    {course.present} Present / {course.absent} Absent
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${course.percentage}%`,
                                                height: '100%',
                                                background: course.percentage < 75 ? 'var(--error)' : 'var(--primary)'
                                            }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
