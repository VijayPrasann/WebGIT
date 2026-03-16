import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpPage.css';

const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const MailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const LockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

export const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirm_password: confirmPassword
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Determine if there's a specific error message from the backend
                throw new Error(data.error || data.message || 'Failed to sign up');
            }

            // Redirect to login page on success
            navigate('/login');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">

                {/* Left Side: Branding */}
                <div className="signup-brand-side">
                    <div className="signup-logo">
                        <div className="signup-logo-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor" />
                                <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1 13h-2v-2h2v2zm0-4h-2V7h2v6z" fill="white" />
                            </svg>
                        </div>
                        FertilityAI Pro
                    </div>

                    <h1 className="signup-title">
                        Precision AI for<br />
                        <span className="text-highlight">Reproductive<br />Health</span>
                    </h1>

                    <p className="signup-subtitle">
                        Join an elite network of healthcare professionals utilizing advanced neural analysis for fertility diagnostics.
                    </p>

                    <div className="security-card">
                        <div className="security-card-header">
                            <div className="security-shield-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 12 15 15 9"></polyline></svg>
                            </div>
                            <div className="security-card-text">
                                <strong>Medical-Grade Security</strong>
                                <span>SOC2 Type II & HIPAA Compliant Infrastructure</span>
                            </div>
                        </div>
                        <div className="security-card-avatars">
                            <div className="avatar a1"></div>
                            <div className="avatar a2"></div>
                            <div className="avatar a3"></div>
                            <div className="avatar-count">+2k</div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="signup-form-side">
                    <div className="form-header">
                        <h2>Create Professional Account</h2>
                        <p>Please provide your credentials to access the specialist dashboard.</p>
                    </div>

                    {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <div className="input-with-icon">
                                <span className="input-icon"><UserIcon /></span>
                                <input
                                    type="text"
                                    placeholder="janesmith_md"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-with-icon">
                                <span className="input-icon"><MailIcon /></span>
                                <input
                                    type="email"
                                    placeholder="jane.smith@medicalcenter.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group half-width">
                                <label>Password</label>
                                <div className="input-with-icon">
                                    <span className="input-icon"><LockIcon /></span>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group half-width">
                                <label>Confirm Password</label>
                                <div className="input-with-icon">
                                    <span className="input-icon"><LockIcon /></span>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="terms-checkbox">
                            <label className="checkbox-label">
                                <input type="checkbox" className="custom-checkbox" required />
                                <span className="checkbox-text">
                                    I agree to the <a href="#terms">Terms of Use</a> and acknowledge the <a href="#privacy">Privacy Policy</a> for clinical data processing.
                                </span>
                            </label>
                        </div>

                        <button type="submit" className="btn-signup-submit" disabled={loading}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="login-prompt">
                        Already have an account? <Link to="/login" className="signin-link">Sign In</Link>
                    </div>

                    <div className="trust-footer">
                        <div className="trust-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            VERIFIED PROFESSIONAL
                        </div>
                        <div className="trust-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            SSL SECURE
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
