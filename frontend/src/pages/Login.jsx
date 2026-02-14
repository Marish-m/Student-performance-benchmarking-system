import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            // In mock mode, data is the user object. In real mode, it might be { user, token }
            const user = data.user || data;
            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'faculty') navigate('/faculty');
            else navigate('/student');
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>SPBS Login</h2>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
