import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import { getStudentProfile } from '../services/studentService';
import { getFacultyProfile } from '../services/facultyService';
import Sidebar from '../components/Sidebar';
import { User, Mail, Shield, Phone, MapPin, Edit2, Check, X, Calendar, Heart, Users, Award, Briefcase, GraduationCap } from 'lucide-react';

const Profile = () => {
    const user = getCurrentUser();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            if (user?.role === 'student') {
                const data = await getStudentProfile(user.id);
                setProfile(data);
                setEditData(data);
            } else if (user?.role === 'faculty') {
                const data = await getFacultyProfile(user.id);
                const facultyData = {
                    ...data,
                    email: 'karthikeyan.m@university.edu',
                    phone: '+91 9876 54321',
                    address: '456 Faculty Court',
                    designation: 'Senior Professor II',
                    expertise: ['Machine Learning', 'Database Optimization', 'Algorithm Design'],
                    joining_date: '2015-06-10'
                };
                setProfile(facultyData);
                setEditData(facultyData);
            } else {
                const adminData = {
                    first_name: 'System',
                    last_name: 'Admin',
                    role: 'admin',
                    email: 'admin@spbs.com',
                    phone: '+91 9657849734',
                    employee_id: 'ADM_001'
                };
                setProfile(adminData);
                setEditData(adminData);
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
                                    <h3 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>{profile.first_name} {profile.last_name}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                                        <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                            <Shield size={14} style={{ color: 'var(--primary)' }} /> {profile.role || user.role}
                                        </p>
                                        <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                            <GraduationCap size={14} style={{ color: 'var(--primary)' }} /> {profile.department || 'Administration'}
                                        </p>
                                        {profile.semester && (
                                            <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                                <Calendar size={14} style={{ color: 'var(--primary)' }} /> Semester {profile.semester}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '40px' }}>
                                {/* Left Column: Personal & Contact */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                    <section>
                                        <h4 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Personal Details</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                                <div className="profile-field">
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Date of Birth</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <Calendar size={16} color="var(--text-muted)" />
                                                        <span>{profile.dob || 'N/A'}</span>
                                                    </div>
                                                </div>
                                                <div className="profile-field">
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Gender</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <User size={16} color="var(--text-muted)" />
                                                        <span>{profile.gender || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="profile-field">
                                                <span style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Blood Group</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <Heart size={16} color="#ef4444" />
                                                    <span>{profile.blood_group || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Information</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                            <div className="profile-field">
                                                <span style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Email Address</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <Mail size={16} color="var(--text-muted)" />
                                                    <span>{profile.email}</span>
                                                </div>
                                            </div>
                                            <div className="profile-field">
                                                <span style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Phone Number</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <Phone size={16} color="var(--text-muted)" />
                                                    <span>{profile.phone || 'N/A'}</span>
                                                </div>
                                            </div>
                                            <div className="profile-field">
                                                <span style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Mailing Address</span>
                                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                                    <MapPin size={16} color="var(--text-muted)" style={{ marginTop: '2px' }} />
                                                    <span>{profile.address || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                {/* Right Column: Academic & Guardian */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                    <section>
                                        <h4 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Academic Status</h4>
                                        <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                                <div>
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Student ID</span>
                                                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{profile.roll_number || profile.employee_id}</div>
                                                </div>
                                                <div>
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Admission Year</span>
                                                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{profile.academic_year || '2023'}</div>
                                                </div>
                                                <div>
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Joining Date</span>
                                                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{profile.joining_date || 'N/A'}</div>
                                                </div>
                                                <div>
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Current Advisor</span>
                                                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>Prof. Rajesh K.</div>
                                                </div>
                                                {profile.role === 'student' || user.role === 'student' ? (
                                                    <>
                                                        <div>
                                                            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Current Arrears</span>
                                                            <div style={{ fontWeight: 'bold', fontSize: '16px', color: profile.current_arrears > 0 ? 'var(--error)' : 'white' }}>{profile.current_arrears || '0'}</div>
                                                        </div>
                                                        <div>
                                                            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Benchmarking</span>
                                                            <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--primary)' }}>{profile.bench_marking || 'NA'}</div>
                                                        </div>
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Skills & Expertise</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {(profile.skills || profile.expertise || ['Communication', 'Teamwork', 'Problem Solving']).map(skill => (
                                                <span key={skill} style={{
                                                    padding: '6px 14px',
                                                    borderRadius: '8px',
                                                    background: 'rgba(168, 85, 247, 0.1)',
                                                    color: 'var(--primary)',
                                                    fontSize: '13px',
                                                    border: '1px solid rgba(168, 85, 247, 0.2)'
                                                }}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </section>

                                    <section>
                                        <h4 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Family & Guardian</h4>
                                        <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.03)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                                <Users size={18} color="var(--error)" />
                                                <span style={{ fontWeight: '600' }}>{profile.guardian_name || 'Emergency Contact'}</span>
                                            </div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '30px' }}>
                                                Relationship: Father / Primary Guardian
                                            </div>
                                            <div style={{ fontSize: '13px', color: 'white', fontWeight: 'bold', marginLeft: '30px', marginTop: '4px' }}>
                                                📞 {profile.emergency_contact || 'N/A'}
                                            </div>
                                        </div>
                                    </section>
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
