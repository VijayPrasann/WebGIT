import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to login');
            }

            // Success: save user session or token if needed
            // Redirect to home/dashboard
            navigate('/dashboard', { replace: true });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">

                {/* Left Side: Branding and Graphic */}
                <div className="login-brand-side">
                    <div className="login-logo">
                        <div className="login-logo-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor" />
                                <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1 13h-2v-2h2v2zm0-4h-2V7h2v6z" fill="white" />
                            </svg>
                        </div>
                        SpermAI
                    </div>

                    <h1 className="login-title">
                        Advanced Fertility<br />Analysis Dashboard
                    </h1>

                    <p className="login-subtitle">
                        Empowering healthcare professionals with AI-driven insights for reproductive health.
                    </p>

                    <div className="login-graphic">
                        {/* Circle base */}
                        <div className="graphic-large-circle">
                            {/* Microscope Icon Box */}
                            <div className="microscope-box">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="microscope-icon">
                                    <path d="M14 6l3-3M6 18h12M10 18v-4M14 18v-4M8 10l8 8" />
                                    <circle cx="10" cy="10" r="4" />
                                </svg>
                            </div>
                            {/* Decorative Floating Squares */}
                            <div className="floating-square top-right">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                            </div>
                            <div className="floating-square bottom-left">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                            </div>
                        </div>
                    </div>

                    <div className="trust-badge">
                        TRUSTED BY 500+ CLINICS WORLDWIDE
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="login-form-side">
                    <div className="portal-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        Healthcare Professional Portal
                    </div>

                    <div className="form-header">
                        <h2>Sign In to Continue</h2>
                        <p>Enter your credentials to access the platform</p>
                    </div>

                    {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="doctor@hospital.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="label-row">
                                <label>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    Password
                                </label>
                                <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                            </div>
                            <div className="password-input-wrapper">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="button" className="btn-visibility">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="login-btn-submit" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="signup-prompt">
                        Don't you have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
                    </div>

                    <div className="secure-login-badge">
                        <div className="secure-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 12 15 15 9"></polyline></svg>
                        </div>
                        <div className="secure-text">
                            <strong>Secure Login</strong>
                            <p>Your credentials are encrypted and protected with enterprise-grade security. This portal is HIPAA compliant.</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Dark mode toggle absolute positioned bottom right */}
            <button className="theme-toggle-fixed" aria-label="Toggle Dark Mode">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </button>
        </div>
    );
};
