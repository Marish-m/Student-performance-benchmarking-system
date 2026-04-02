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
        document.body.classList.remove('role-admin', 'role-faculty', 'role-student');
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
        {
            label: 'Students',
            path: '/users?role=student',
            icon: GraduationCap,
            show: isAdmin
        },
        // Faculty Links
        {
            label: 'Dashboard',
            path: '/faculty',
            icon: LayoutDashboard,
            show: isFaculty
        },
        {
            label: 'Students',
            path: '/students',
            icon: GraduationCap,
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
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '40px'
            }}>
                <img
                    src="/logo.svg"
                    alt="SPBS Logo"
                    style={{ width: '40px', height: '40px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ color: 'var(--primary)', margin: 0 }}>{title}</h2>
                    <div style={{
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        fontWeight: '800',
                        color: user?.role === 'admin' ? 'var(--admin-color)' : user?.role === 'faculty' ? 'var(--faculty-color)' : 'var(--student-color)',
                        background: user?.role === 'admin' ? 'rgba(168, 85, 247, 0.1)' : user?.role === 'faculty' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        marginTop: '4px',
                        width: 'fit-content',
                        letterSpacing: '1px'
                    }}>
                        {user?.role || 'Guest'}
                    </div>
                </div>
            </div>
            <nav style={{ flex: 1 }}>
                {menuItems.filter(item => item.show).map((item) => {
                    const currentPath = location.pathname + location.search;
                    const isActive = currentPath === item.path;
                    return (
                        <div
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px',
                                background: isActive ? `color-mix(in srgb, var(--primary), transparent 90%)` : 'transparent',
                                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                fontWeight: isActive ? '600' : '400'
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
