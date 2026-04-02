import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import { getAcademicHistory } from '../services/studentService';
import Sidebar from '../components/Sidebar';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, ComposedChart, Line, Cell } from 'recharts';
import { GraduationCap, Award, BookOpen, TrendingUp } from 'lucide-react';

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
                <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: '800' }}>Academic Journey</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Complete academic record and performance progression</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: '8px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: '600' }}>
                        <TrendingUp size={16} /> Progressing Well
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '10px', borderRadius: '12px', color: 'var(--primary)' }}>
                                <Award size={24} />
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Cumulative GPA</h3>
                                <p style={{ fontSize: '26px', fontWeight: '800' }}>{stats.avgGpa} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '400' }}>/ 10</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '12px', color: '#22c55e' }}>
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Credits Earned</h3>
                                <p style={{ fontSize: '26px', fontWeight: '800' }}>{stats.totalCredits}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '10px', borderRadius: '12px', color: 'var(--primary)' }}>
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Academic Level</h3>
                                <p style={{ fontSize: '26px', fontWeight: '800', color: '#22c55e' }}>Major</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '32px' }}>
                    {/* GPA Trend Chart */}
                    <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>GPA Progression</h3>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '3px' }}></div>
                                    <span style={{ color: 'var(--text-muted)' }}>Semester GPA</span>
                                </div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={320}>
                            <ComposedChart data={history}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="semester"
                                    stroke="var(--text-muted)"
                                    fontSize={12}
                                    tickFormatter={(val) => `SEM ${val}`}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    domain={[0, 10]}
                                    stroke="var(--text-muted)"
                                    fontSize={12}
                                    axisLine={false}
                                    tickLine={false}
                                    ticks={[0, 2, 4, 6, 8, 10]}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                    contentStyle={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                        padding: '12px'
                                    }}
                                    itemStyle={{ color: 'white', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="gpa" barSize={40} radius={[8, 8, 0, 0]}>
                                    {history.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.gpa >= 8.5 ? 'var(--primary)' : 'rgba(168, 85, 247, 0.4)'} />
                                    ))}
                                </Bar>
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Detailed History Table */}
                    <div className="card">
                        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>Semester Breakdown</h3>
                        <div style={{ overflowY: 'auto', maxHeight: '350px' }}>
                            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '12px' }}>
                                        <th style={{ padding: '12px', fontWeight: '600' }}>SEMESTER</th>
                                        <th style={{ padding: '12px', fontWeight: '600' }}>GPA</th>
                                        <th style={{ padding: '12px', fontWeight: '600' }}>CREDITS</th>
                                        <th style={{ padding: '12px', fontWeight: '600', textAlign: 'right' }}>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map(h => (
                                        <tr key={h.semester} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                            <td style={{ padding: '16px', fontSize: '14px', borderRadius: '12px 0 0 12px' }}>Semester {h.semester}</td>
                                            <td style={{ padding: '16px', fontWeight: '800', color: 'var(--text-main)', fontSize: '15px' }}>{h.gpa}</td>
                                            <td style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '14px' }}>{h.credits} Cr.</td>
                                            <td style={{ padding: '16px', textAlign: 'right', borderRadius: '0 12px 12px 0' }}>
                                                <span style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '11px',
                                                    fontWeight: '700',
                                                    textTransform: 'uppercase',
                                                    background: h.status === 'Completed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(168, 85, 247, 0.1)',
                                                    color: h.status === 'Completed' ? '#22c55e' : 'var(--primary)',
                                                    border: h.status === 'Completed' ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(168, 85, 247, 0.2)'
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
