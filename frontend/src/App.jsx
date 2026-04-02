import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import Reports from './pages/Reports';
import History from './pages/History';
import Users from './pages/Users';
import Students from './pages/Students';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { getCurrentUser } from './services/authService';
import './index.css';

const App = () => {
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }

    // Apply role-based theme
    const user = getCurrentUser();
    if (user?.role) {
      document.body.classList.remove('role-admin', 'role-faculty', 'role-student');
      document.body.classList.add(`role-${user.role.toLowerCase()}`);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/history" element={<History />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/students" element={<Students />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
