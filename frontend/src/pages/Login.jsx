import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { Mail, Lock, LogIn, ChevronRight, Github } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const data = await login(email, password);
            const user = data.user || data;

            // Add a small delay for feeling of "processing" for premium feel
            setTimeout(() => {
                // Set role class on body for coloring
                if (user.role) {
                    document.body.classList.remove('role-admin', 'role-faculty', 'role-student');
                    document.body.classList.add(`role-${user.role.toLowerCase()}`);
                }

                if (user.role === 'admin') navigate('/admin');
                else if (user.role === 'faculty') navigate('/faculty');
                else navigate('/student');
            }, 800);
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
            setIsLoading(false);
        }
    };

    return (
        <div className="login-screen">
            <div className="login-visual-panel">
                <div className="visual-content">
                    <img
                        src="/logo.svg"
                        alt="SPBS Logo"
                        className="login-logo-large"
                    />
                    <h1>Student Benchmarking System</h1>
                    <p>
                        The intelligent benchmarking system designed to track,
                        analyze and improve student performance across all disciplines.
                    </p>
                </div>
            </div>

            <div className="login-form-panel">
                <div className="login-form-container">
                    <div className="login-header">
                        <h2>Welcome Back</h2>
                        <p>Sign in to your SPBS account to continue</p>
                    </div>

                    {error && <div className="error-msg">{error}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="input-wrapper">
                            <label>Email Address</label>
                            <div className="input-relative">
                                <Mail className="input-icon" size={20} />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@university.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <div className="input-relative">
                                <Lock className="input-icon" size={20} />
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-footer">
                            <label className="remember-me">
                                <input type="checkbox" />
                                Remember me
                            </label>
                            <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            id="login-submit"
                            type="submit"
                            className="submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                'Signing in...'
                            ) : (
                                <>
                                    Sign In <ChevronRight size={18} style={{ marginLeft: '8px' }} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="divider">
                        <span>OR CONTINUE WITH</span>
                    </div>

                    <div className="social-login">
                        <button className="social-btn" onClick={(e) => e.preventDefault()}>
                            <Github size={20} />
                            GitHub
                        </button>
                        <button className="social-btn" onClick={(e) => e.preventDefault()}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: '#4285F4'
                            }}>G</div>
                            Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
