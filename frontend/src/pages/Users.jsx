import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { UserPlus, Search, Trash2, Edit } from 'lucide-react';

const UsersManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Marish M', role: 'Student', dept: 'Computer Science', email: 'marish@example.com', status: 'Active' },
        { id: 2, name: 'Faculty User', role: 'Faculty', dept: 'Information Technology', email: 'faculty@example.com', status: 'Active' },
        { id: 3, name: 'Admin User', role: 'Admin', dept: 'Management', email: 'admin@example.com', status: 'Active' },
        { id: 4, name: 'John Doe', role: 'Student', dept: 'Electronics', email: 'john@example.com', status: 'Inactive' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this user?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Sidebar title="SPBS Admin" />

            <div style={{ flex: 1, padding: '40px' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px' }}>User Management</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Manage faculty and student access</p>
                    </div>
                    <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        <UserPlus size={18} /> Add New User
                    </button>
                </header>

                <div className="card" style={{ padding: 0, borderRadius: '24px', overflow: 'hidden' }}>
                    <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ position: 'relative', width: '300px' }}>
                            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                type="text"
                                placeholder="Search users by name or role..."
                                style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'white' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <select style={{ padding: '10px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }}>
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
                            {filteredUsers.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '500' }}>{user.name}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ fontSize: '14px' }}>{user.role}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user.dept}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '11px',
                                            background: user.status === 'Active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                            color: user.status === 'Active' ? '#22c55e' : 'var(--text-muted)'
                                        }}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                style={{ background: 'transparent', border: 'none', color: 'var(--error)', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersManagement;
