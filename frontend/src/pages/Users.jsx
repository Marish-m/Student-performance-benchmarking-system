/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { UserPlus, Search, Trash2, Edit, GraduationCap } from 'lucide-react';
import { getUsers, createUser, getDepartments, deleteUser } from '../services/adminService';

const UsersManagement = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialRole = queryParams.get('role');

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [roleFilter, setRoleFilter] = useState(initialRole ? initialRole.charAt(0).toUpperCase() + initialRole.slice(1) : 'All Roles');
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        role: initialRole || 'student',
        first_name: '',
        last_name: '',
        department: '',
        roll_number: '',
        semester: '1',
        section: 'A',
        current_arrears: 0,
        bench_marking: 0,
        faculty_id: '',
        designation: 'Assistant Professor'
    });
    const [message, setMessage] = useState({ text: '', type: '' });


    const fetchData = useCallback(async () => {
        try {
            const [usersData, deptsData] = await Promise.all([
                getUsers(),
                getDepartments()
            ]);
            setUsers(usersData);
            setDepartments(deptsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
         
    }, [setUsers, setDepartments]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const role = queryParams.get('role');
        if (role) {
             
            setRoleFilter(role.charAt(0).toUpperCase() + role.slice(1));
            setFormData(prev => ({ ...prev, role: role }));
        } else {
             
            setRoleFilter('All Roles');
        }
        fetchData();
    }, [location.search, fetchData]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createUser(formData);
            setMessage({ text: `${result.message}. Default Password: Welcome@123`, type: 'success' });
            fetchData();
            setTimeout(() => {
                setShowModal(false);
                setMessage({ text: '', type: '' });
                setFormData({
                    email: '',
                    role: formData.role,
                    first_name: '',
                    last_name: '',
                    department: '',
                    roll_number: '',
                    semester: '1',
                    section: 'A',
                    current_arrears: 0,
                    bench_marking: 0,
                    faculty_id: '',
                    designation: 'Assistant Professor'
                });
            }, 3000);
        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Error creating user', type: 'error' });
        }
    };

    const handleDelete = async (user) => {
        const confirmMsg = `Are you sure you want to remove ${user.first_name} ${user.last_name} (${user.role})? This will delete all their related records.`;
        if (window.confirm(confirmMsg)) {
            try {
                await deleteUser(user.id);
                setUsers(users.filter(u => u.id !== user.id));
                setMessage({ text: 'User deleted successfully', type: 'success' });
                setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            } catch {
                setMessage({ text: 'Error deleting user', type: 'error' });
            }
        }
    };

    const filteredUsers = users.filter(user => {
        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
        const roleMatches = roleFilter === 'All Roles' || user.role.toLowerCase() === roleFilter.toLowerCase();
        const searchMatches = fullName.includes(searchTerm.toLowerCase()) ||
            (user.role || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.roll_number || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());

        return roleMatches && searchMatches;
    });

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Sidebar title="SPBS Admin" />

            <div style={{ flex: 1, padding: '40px' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px' }}>User Management</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Manage faculty and student access</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        <UserPlus size={18} /> Add New User
                    </button>
                </header>

                {message.text && (
                    <div style={{
                        padding: '16px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: message.type === 'success' ? '#22c55e' : '#ef4444',
                        border: `1px solid ${message.type === 'success' ? '#22c55e' : '#ef4444'}`
                    }}>
                        {message.text}
                    </div>
                )}

                <div className="card" style={{ padding: 0, borderRadius: '24px', overflow: 'hidden' }}>
                    <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ position: 'relative', width: '300px' }}>
                            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                id="user-search"
                                type="text"
                                placeholder="Search users by name, email, or roll #..."
                                style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'white' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '18px' }}
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <select
                                id="role-filter"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                style={{ padding: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                            >
                                <option>All Roles</option>
                                <option>Student</option>
                                <option>Faculty</option>
                            </select>
                        </div>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '13px' }}>
                                <th style={{ padding: '16px 24px' }}>User</th>
                                <th style={{ padding: '16px 24px' }}>Role / Dept</th>
                                <th style={{ padding: '16px 24px' }}>Status</th>
                                <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No users found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map(user => (
                                    <tr key={user.id} className="user-row" style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                                        <td style={{ padding: '16px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    background: user.role === 'admin' ? 'var(--admin-color)' : user.role === 'faculty' ? 'var(--faculty-color)' : 'var(--student-color)',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    fontWeight: 'bold',
                                                    color: 'white'
                                                }}>
                                                    {(user.first_name || 'U').charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '500' }}>{user.first_name} {user.last_name}</div>
                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user.email} {user.roll_number && `(${user.roll_number})`}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <div style={{
                                                fontSize: '11px',
                                                textTransform: 'uppercase',
                                                fontWeight: '700',
                                                letterSpacing: '0.5px',
                                                color: user.role === 'admin' ? 'var(--admin-color)' : user.role === 'faculty' ? 'var(--faculty-color)' : 'var(--student-color)',
                                                background: user.role === 'admin' ? 'rgba(168, 85, 247, 0.1)' : user.role === 'faculty' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                                display: 'inline-block',
                                                marginBottom: '4px'
                                            }}>
                                                {user.role}
                                            </div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user.department}</div>
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '20px',
                                                fontSize: '11px',
                                                background: (user.status || 'Active') === 'Active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                                color: (user.status || 'Active') === 'Active' ? '#22c55e' : 'var(--text-muted)'
                                            }}>
                                                {user.status || 'Active'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                <button className="edit-user-btn" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    className="delete-user-btn"
                                                    onClick={() => handleDelete(user)}
                                                    style={{ background: 'transparent', border: 'none', color: 'var(--error)', cursor: 'pointer' }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div className="card" style={{ width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ margin: 0 }}>Add New User</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '24px' }}>&times;</button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="form-group">
                                <label>Role</label>
                                <select name="role" value={formData.role} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }}>
                                    <option value="student">Student</option>
                                    <option value="faculty">Faculty</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>First Name</label>
                                    <input type="text" name="first_name" required value={formData.first_name} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Last Name</label>
                                    <input type="text" name="last_name" required value={formData.last_name} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                            </div>

                            <div className="form-group">
                                <label>Department</label>
                                <select name="department" required value={formData.department} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }}>
                                    <option value="">Select Department</option>
                                    {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Electrical Engineering">Electrical Engineering</option>
                                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                                </select>
                            </div>

                            {formData.role === 'student' ? (
                                <>
                                    <div className="form-group">
                                        <label>Roll Number</label>
                                        <input type="text" name="roll_number" required value={formData.roll_number} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div className="form-group" style={{ flex: 1 }}>
                                            <label>Semester</label>
                                            <input type="number" name="semester" min="1" max="8" required value={formData.semester} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                                        </div>
                                        <div className="form-group" style={{ flex: 1 }}>
                                            <label>Section</label>
                                            <input type="text" name="section" value={formData.section} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                                        </div>
                                        <div className="form-group" style={{ flex: 1 }}>
                                            <label>Arrears</label>
                                            <input type="number" name="current_arrears" min="0" value={formData.current_arrears} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                                        </div>
                                        <div className="form-group" style={{ flex: 1 }}>
                                            <label>Benchmark</label>
                                            <input type="number" name="bench_marking" min="0" max="100" value={formData.bench_marking} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <label>Faculty ID</label>
                                        <input type="text" name="faculty_id" required value={formData.faculty_id} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                                    </div>
                                    <div className="form-group">
                                        <label>Designation</label>
                                        <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-main)', color: 'white', border: '1px solid var(--border-color)' }} />
                                    </div>
                                </>
                            )}

                            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                <button type="submit" className="login-btn" style={{ flex: 1 }}>Create User</button>
                                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'transparent', color: 'white', cursor: 'pointer' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersManagement;
