import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    LogOut,
    FileText,
    GraduationCap,
    History as HistoryIcon,
    Settings as SettingsIcon,
    User as UserIcon
} from 'lucide-react';
import { logout, getCurrentUser } from '../services/authService';

const Sidebar = ({ title = "SPBS" }) => {
    const user = getCurrentUser();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isAdmin = user?.role === 'admin';
    const isFaculty = user?.role === 'faculty';
    const isStudent = user?.role === 'student';

    const menuItems = [
        // Admin Links
        {
            label: 'Dashboard',
            path: '/admin',
            icon: LayoutDashboard,
            show: isAdmin
        },
        {
            label: 'Reports',
            path: '/reports',
            icon: FileText,
            show: isAdmin || isFaculty
        },
        {
            label: 'Users',
            path: '/users',
            icon: Users,
            show: isAdmin
        },
        // Faculty Links
        {
            label: 'Dashboard',
            path: '/faculty',
            icon: LayoutDashboard,
            show: isFaculty
        },
        // Student Links
        {
            label: 'Scoreboard',
            path: '/student',
            icon: GraduationCap,
            show: isStudent
        },
        {
            label: 'History',
            path: '/history',
            icon: HistoryIcon,
            show: isStudent
        },
        {
            label: 'Profile',
            path: '/profile',
            icon: UserIcon,
            show: true
        },
        {
            label: 'Settings',
            path: '/settings',
            icon: SettingsIcon,
            show: true
        },
    ];

    return (
        <div style={{
            width: '260px',
            background: 'var(--bg-card)',
            borderRight: '1px solid var(--border-color)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            userSelect: 'none'
        }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '40px' }}>{title}</h2>
            <nav style={{ flex: 1 }}>
                {menuItems.filter(item => item.show).map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <div
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px',
                                background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <item.icon size={20} /> {item.label}
                        </div>
                    );
                })}
            </nav>
            <div
                onClick={handleLogout}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    color: 'var(--error)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: 'auto'
                }}
            >
                <LogOut size={20} /> Logout
            </div>
        </div>
    );
};

export default Sidebar;
