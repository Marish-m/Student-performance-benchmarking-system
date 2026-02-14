import React, { useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from '../services/authService';
import { getStudentProfile, getAttendance, getStudentPerformance, getRecentActivities, getAcademicHistory } from '../services/studentService';
import Sidebar from '../components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { AlertCircle, Clock, Calendar, CheckCircle, FileText } from 'lucide-react';

const StudentDashboard = () => {
    const user = getCurrentUser();
    const [profile, setProfile] = useState(null);
    const [performanceData, setPerformanceData] = useState([]);
    const [attendance, setAttendance] = useState(null);
    const [activities, setActivities] = useState([]);

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
                    <p style={{ color: 'var(--text-muted)' }}>Roll No: {profile?.roll_number} | {profile?.department}</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
                    {/* Main Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                        <div className="card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary)', marginBottom: '12px' }}>
                                <Calendar size={20} />
                                <span style={{ fontSize: '14px', fontWeight: '600' }}>ATTENDANCE</span>
                            </div>
                            <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{attendance?.total_percentage}%</p>
                            <div style={{ marginTop: '12px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: `${attendance?.total_percentage}%`, height: '100%', background: 'var(--primary)' }}></div>
                            </div>
                        </div>
                        <div className="card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#22c55e', marginBottom: '12px' }}>
                                <CheckCircle size={20} />
                                <span style={{ fontSize: '14px', fontWeight: '600' }}>COURSES PASSED</span>
                            </div>
                            <p style={{ fontSize: '32px', fontWeight: 'bold' }}>12/15</p>
                        </div>
                    </div>

                    {/* Notifications Brief */}
                    <div className="card">
                        <h3 style={{ fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Action Required <span style={{ padding: '2px 8px', borderRadius: '12px', background: 'var(--error)', fontSize: '12px' }}>{performanceData.filter(p => p.total_marks < p.class_average).length}</span>
                        </h3>
                        {performanceData.filter(p => p.total_marks < p.class_average).slice(0, 1).map(p => (
                            <div key={p.id} style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                                <AlertCircle size={14} style={{ color: 'var(--error)', marginRight: '4px' }} />
                                Below average in {p.course_code}
                            </div>
                        ))}
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
            </div>
        </div>
    );
};

export default StudentDashboard;
