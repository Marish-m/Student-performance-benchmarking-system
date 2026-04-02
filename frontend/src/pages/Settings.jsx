import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Moon, Sun, Bell, Globe, Lock, Eye, Palette } from 'lucide-react';

const Settings = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        results: true,
        attendance: true
    });

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    };

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Sidebar title="SPBS Settings" />

            <div style={{ flex: 1, padding: '40px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ marginBottom: '32px' }}>System Settings</h1>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Appearance Section */}
                        <section className="card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <Palette style={{ color: 'var(--primary)' }} />
                                <h3 style={{ fontSize: '20px' }}>Appearance</h3>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div
                                    onClick={() => handleThemeChange('dark')}
                                    style={{
                                        padding: '20px',
                                        borderRadius: '16px',
                                        background: theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'var(--bg-main)',
                                        border: theme === 'dark' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <Moon size={20} style={{ color: theme === 'dark' ? 'var(--primary)' : 'var(--text-muted)' }} />
                                        {theme === 'dark' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>}
                                    </div>
                                    <h4 style={{ marginBottom: '4px' }}>Deep Night</h4>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>The default sleek dark mode</p>
                                </div>

                                <div
                                    onClick={() => handleThemeChange('light')}
                                    style={{
                                        padding: '20px',
                                        borderRadius: '16px',
                                        background: theme === 'light' ? 'rgba(168, 85, 247, 0.1)' : 'var(--bg-main)',
                                        border: theme === 'light' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <Sun size={20} style={{ color: theme === 'light' ? 'var(--primary)' : 'var(--text-muted)' }} />
                                        {theme === 'light' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>}
                                    </div>
                                    <h4 style={{ marginBottom: '4px' }}>Pure Light</h4>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Clean and bright workspace</p>
                                </div>
                            </div>
                        </section>

                        {/* Notifications Section */}
                        <section className="card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <Bell style={{ color: '#eab308' }} />
                                <h3 style={{ fontSize: '20px' }}>Notifications</h3>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { id: 'results', label: 'Semester Results', desc: 'Notify immediately when new grades are published' },
                                    { id: 'attendance', label: 'Attendance Alerts', desc: 'Daily summary and low-attendance warnings' },
                                    { id: 'email', label: 'Email Digest', desc: 'Weekly summarized reports via email' }
                                ].map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div>
                                            <h4 style={{ marginBottom: '4px' }}>{item.label}</h4>
                                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.desc}</p>
                                        </div>
                                        <div
                                            onClick={() => toggleNotification(item.id)}
                                            style={{
                                                width: '44px',
                                                height: '24px',
                                                borderRadius: '12px',
                                                background: notifications[item.id] ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                                position: 'relative',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s'
                                            }}
                                        >
                                            <div style={{
                                                width: '18px',
                                                height: '18px',
                                                borderRadius: '50%',
                                                background: 'white',
                                                position: 'absolute',
                                                top: '3px',
                                                left: notifications[item.id] ? '23px' : '3px',
                                                transition: 'all 0.3s'
                                            }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Privacy Section */}
                        <section className="card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <Lock style={{ color: '#22c55e' }} />
                                <h3 style={{ fontSize: '20px' }}>Security & Privacy</h3>
                            </div>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <button style={{ padding: '10px 20px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)', cursor: 'pointer', fontSize: '14px' }}>
                                    Change Password
                                </button>
                                <button style={{ padding: '10px 20px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)', cursor: 'pointer', fontSize: '14px' }}>
                                    Two-Factor Authentication
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
