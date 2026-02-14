import React, { useState, useEffect } from 'react';
import { getAnalyticsData } from '../services/facultyService';
import Sidebar from '../components/Sidebar';
import { Download, TrendingUp, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, PieChart as RePie, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Reports = () => {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            const data = await getAnalyticsData();
            setAnalytics(data);
        };
        fetchAnalytics();
    }, []);

    if (!analytics) return null;

    const barData = analytics.distribution.map(d => ({
        name: d.name,
        performance: d.value,
        target: 75
    }));

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Sidebar title="SPBS Reports" />

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px' }}>
                <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '28px' }}>Executive Analytics Report</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Academic Year 2025-26 | Semester 4 | Global Overview</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{ background: 'transparent', color: 'white', border: '1px solid var(--border-color)', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                            Filter Period
                        </button>
                        <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                            <Download size={18} /> Export PDF
                        </button>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', marginBottom: '32px' }}>
                    {/* Pie Chart: Distribution */}
                    <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ marginBottom: '24px', fontSize: '18px' }}>Performance Distribution by Department</h3>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <RePie>
                                    <Pie
                                        data={analytics.distribution}
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {analytics.distribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }} />
                                </RePie>
                            </ResponsiveContainer>
                            <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {analytics.distribution.map(s => (
                                    <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color }}></div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '13px', fontWeight: '500' }}>{s.name}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.value}% Avg</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                            <div style={{ color: 'var(--primary)', marginBottom: '12px' }}><TrendingUp size={24} /></div>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Global Average</h4>
                            <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{analytics.stats.average_marks}%</p>
                            <div style={{ fontSize: '12px', color: '#22c55e', marginTop: '4px' }}>+2.4% from last sem</div>
                        </div>
                        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                            <div style={{ color: '#22c55e', marginBottom: '12px' }}><CheckCircle size={24} /></div>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Passing Rate</h4>
                            <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{analytics.stats.passing_rate}%</p>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Target: 85%</div>
                        </div>
                        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                            <div style={{ color: 'var(--error)', marginBottom: '12px' }}><AlertCircle size={24} /></div>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>At Risk Students</h4>
                            <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{analytics.stats.risk_count}</p>
                            <div style={{ fontSize: '12px', color: 'var(--error)', marginTop: '4px' }}>Requires Attention</div>
                        </div>
                        <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                            <div style={{ color: 'var(--primary)', marginBottom: '12px' }}><Users size={24} /></div>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Total Faculty</h4>
                            <p style={{ fontSize: '28px', fontWeight: 'bold' }}>12</p>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Across 3 Depts</div>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ marginBottom: '24px' }}>Comparative Performance vs Target</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="var(--text-muted)" />
                            <YAxis stroke="var(--text-muted)" />
                            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }} />
                            <Bar dataKey="performance" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={40} />
                            <Bar dataKey="target" fill="rgba(255,255,255,0.05)" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Reports;
