import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import { getStudentProfile } from '../services/studentService';
import { getFacultyProfile } from '../services/facultyService';
import Sidebar from '../components/Sidebar';
import { User, Mail, Shield, Phone, MapPin, Edit2, Check, X } from 'lucide-react';

const Profile = () => {
    const user = getCurrentUser();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            if (user?.role === 'student') {
                const data = await getStudentProfile(user.id);
                setProfile({ ...data, email: 'marish.m@university.edu', phone: '+1 234 567 890', address: '123 Campus Lane' });
                setEditData({ ...data, email: 'marish.m@university.edu', phone: '+1 234 567 890', address: '123 Campus Lane' });
            } else if (user?.role === 'faculty') {
                const data = await getFacultyProfile(user.id);
                setProfile({ ...data, email: 'karthikeyan.m@university.edu', phone: '+1 987 654 321', address: '456 Faculty Court' });
                setEditData({ ...data, email: 'karthikeyan.m@university.edu', phone: '+1 987 654 321', address: '456 Faculty Court' });
            } else {
                setProfile({ first_name: 'System', last_name: 'Admin', role: 'admin', email: 'admin@spbs.com' });
                setEditData({ first_name: 'System', last_name: 'Admin', role: 'admin', email: 'admin@spbs.com' });
            }
        };
        fetchProfile();
    }, [user?.id, user?.role]);

    const handleSave = () => {
        setProfile(editData);
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    if (!profile) return <div className="loading">Loading Profile...</div>;

    const initials = `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Sidebar title="SPBS Profile" />

            <div style={{ flex: 1, padding: '40px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ marginBottom: '32px' }}>Account Profile</h1>

                    <div className="card" style={{ padding: 0, borderRadius: '24px', overflow: 'hidden' }}>
                        {/* Header Banner */}
                        <div style={{ height: '120px', background: 'linear-gradient(135deg, var(--primary) 0%, #4338ca 100%)' }}></div>

                        <div style={{ padding: '0 40px 40px', marginTop: '-60px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '30px',
                                    background: 'var(--bg-card)',
                                    border: '4px solid var(--bg-main)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                    color: 'var(--primary)',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                                }}>
                                    {initials}
                                </div>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '10px 20px',
                                            borderRadius: '12px',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: 'white',
                                            border: '1px solid var(--border-color)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Edit2 size={18} /> Edit Profile
                                    </button>
                                ) : (
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'white', cursor: 'pointer' }}
                                        >
                                            <X size={18} />
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                        >
                                            <Check size={18} /> Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                                <div>
                                    <h3 style={{ fontSize: '24px', marginBottom: '4px' }}>{profile.first_name} {profile.last_name}</h3>
                                    <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Shield size={14} /> {profile.role || user.role} | {profile.department || 'Administration'}
                                    </p>
                                </div>
                            </div>

                            <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid var(--border-color)' }} />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <label style={{ display: 'block' }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>First Name</span>
                                        <input
                                            disabled={!isEditing}
                                            value={editData.first_name}
                                            onChange={e => setEditData({ ...editData, first_name: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px', background: isEditing ? 'var(--bg-main)' : 'transparent', color: 'white', border: isEditing ? '1px solid var(--primary)' : '1px solid transparent' }}
                                        />
                                    </label>
                                    <label style={{ display: 'block' }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Last Name</span>
                                        <input
                                            disabled={!isEditing}
                                            value={editData.last_name}
                                            onChange={e => setEditData({ ...editData, last_name: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px', background: isEditing ? 'var(--bg-main)' : 'transparent', color: 'white', border: isEditing ? '1px solid var(--primary)' : '1px solid transparent' }}
                                        />
                                    </label>
                                    <label style={{ display: 'block' }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Email Address</span>
                                        <div style={{ position: 'relative' }}>
                                            <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                            <input
                                                disabled={!isEditing}
                                                value={editData.email}
                                                onChange={e => setEditData({ ...editData, email: e.target.value })}
                                                style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', background: isEditing ? 'var(--bg-main)' : 'transparent', color: 'white', border: isEditing ? '1px solid var(--primary)' : '1px solid transparent' }}
                                            />
                                        </div>
                                    </label>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <label style={{ display: 'block' }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Phone Number</span>
                                        <div style={{ position: 'relative' }}>
                                            <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                            <input
                                                disabled={!isEditing}
                                                value={editData.phone}
                                                onChange={e => setEditData({ ...editData, phone: e.target.value })}
                                                style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', background: isEditing ? 'var(--bg-main)' : 'transparent', color: 'white', border: isEditing ? '1px solid var(--primary)' : '1px solid transparent' }}
                                            />
                                        </div>
                                    </label>
                                    <label style={{ display: 'block' }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Mailing Address</span>
                                        <div style={{ position: 'relative' }}>
                                            <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                            <input
                                                disabled={!isEditing}
                                                value={editData.address}
                                                onChange={e => setEditData({ ...editData, address: e.target.value })}
                                                style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', background: isEditing ? 'var(--bg-main)' : 'transparent', color: 'white', border: isEditing ? '1px solid var(--primary)' : '1px solid transparent' }}
                                            />
                                        </div>
                                    </label>
                                    <div>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Role Identifier</span>
                                        <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)', fontSize: '14px', border: '1px solid var(--border-color)' }}>
                                            {profile.roll_number || profile.employee_id || 'ADMIN_ID_001'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
