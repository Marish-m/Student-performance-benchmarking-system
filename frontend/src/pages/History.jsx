import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import { getAcademicHistory } from '../services/studentService';
import Sidebar from '../components/Sidebar';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const HistoryPage = () => {
    const user = getCurrentUser();
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState({ totalCredits: 0, avgGpa: 0 });

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getAcademicHistory(user?.id);
            setHistory(data);

            const total = data.reduce((sum, item) => sum + item.credits, 0);
            const avg = (data.reduce((sum, item) => sum + parseFloat(item.gpa), 0) / data.length).toFixed(2);
            setStats({ totalCredits: total, avgGpa: avg });
        };
        fetchHistory();
    }, [user?.id]);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Sidebar title="SPBS History" />

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px' }}>
                <header style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '28px' }}>Academic Journey</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Complete academic record and performance progression</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '10px', borderRadius: '12px', color: 'var(--primary)' }}>
                                <Award size={24} />
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase' }}>Cumulative GPA</h3>
                                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.avgGpa} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/ 10</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '12px', color: '#22c55e' }}>
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase' }}>Total Credits Earned</h3>
                                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalCredits}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '10px', borderRadius: '12px', color: 'var(--primary)' }}>
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase' }}>Status</h3>
                                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>Active</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
                    {/* GPA Trend Chart */}
                    <div className="card">
                        <h3 style={{ marginBottom: '24px' }}>GPA Progression</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="semester" label={{ value: 'Semester', position: 'insideBottom', offset: -5 }} stroke="var(--text-muted)" />
                                <YAxis domain={[0, 10]} stroke="var(--text-muted)" />
                                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }} />
                                <Area type="monotone" dataKey="gpa" stroke="var(--primary)" fillOpacity={1} fill="url(#colorGpa)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Detailed History Table */}
                    <div className="card">
                        <h3 style={{ marginBottom: '24px' }}>Semester Details</h3>
                        <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '13px' }}>
                                        <th style={{ padding: '12px' }}>SEM</th>
                                        <th style={{ padding: '12px' }}>GPA</th>
                                        <th style={{ padding: '12px' }}>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map(h => (
                                        <tr key={h.semester} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '12px' }}>{h.semester}</td>
                                            <td style={{ padding: '12px', fontWeight: 'bold' }}>{h.gpa}</td>
                                            <td style={{ padding: '12px' }}>
                                                <span style={{
                                                    padding: '4px 10px',
                                                    borderRadius: '20px',
                                                    fontSize: '11px',
                                                    background: h.status === 'Completed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                                                    color: h.status === 'Completed' ? '#22c55e' : 'var(--primary)'
                                                }}>
                                                    {h.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
