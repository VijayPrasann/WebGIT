// @ts-ignore
import { apiFetch } from '../../api';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResetPasswordPage.css';

export const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!email) {
            navigate('/forgot-password');
        }
    }, [email, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const response = await apiFetch('/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    new_password: password,
                    confirm_password: confirmPassword
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to reset password.');
            }

            setSuccessMessage('Password reset successful. Routing to Login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setError(err.message || 'Server error during password reset.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-layout">

            {/* Dynamic Sideline Text */}
            <div className="side-text left">
                SYSTEM TELEMETRY FLUX
            </div>
            <div className="side-text right">
                MEDICAL PROTOCOL D-41
            </div>

            {/* Header Navbar */}
            <header className="reset-header">
                <div className="brand-section">
                    <div className="brand-logo-shield">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#2ee37f" stroke="#111a13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <path d="M9 12l2 2 4-4"></path>
                        </svg>
                    </div>
                    <div className="brand-titles">
                        <h2>SPERM AI </h2>

                    </div>
                </div>

                <div className="header-actions">
                    <div className="sys-status">
                        <span className="label">SYSTEM STATUS</span>
                        <span className="value encrypted"><span className="dot"></span> ENCRYPTED</span>
                    </div>
                    <button className="icon-btn settings-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </button>
                </div>
            </header>

            <main className="reset-main">
                <div className="reset-card">

                    {/* Corner Reticule Decorative */}
                    <div className="corner-bracket"></div>

                    <div className="reset-shield-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 2v6h-6"></path>
                            <path d="M3 12a9 9 0 1 0 2.13-5.87L21 8"></path>
                            <rect x="10" y="10" width="4" height="6" rx="1"></rect>
                            <path d="M10 12h4"></path>
                        </svg>
                    </div>

                    <h1 className="reset-title">Security Verification</h1>

                    <p className="reset-subtitle">
                        Update your medical-grade authentication credentials
                    </p>

                    <form className="reset-form" onSubmit={handleSubmit}>

                        {error && <div style={{ color: '#ff4d4d', fontSize: '0.85rem', marginBottom: '0.5rem', width: '100%', textAlign: 'center', fontWeight: '600' }}>Error: {error}</div>}
                        {successMessage && <div style={{ color: '#2ee37f', fontSize: '0.85rem', marginBottom: '0.5rem', width: '100%', textAlign: 'center', fontWeight: '600' }}>{successMessage}</div>}

                        <div className="input-group">
                            <div className="group-header">
                                <label>NEW PASSWORD</label>
                                <span className="requirement">min. 12 characters</span>
                            </div>
                            <div className="input-field-wrapper">
                                <div className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="dark-input"
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="button" className="visibility-btn" onClick={() => setShowPassword(!showPassword)}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="group-header">
                                <label>CONFIRM PASSWORD</label>
                            </div>
                            <div className="input-field-wrapper">
                                <div className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="dark-input"
                                    placeholder="••••••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button type="button" className="visibility-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </button>
                            </div>
                        </div>



                        <button type="submit" className="update-btn" style={{ opacity: loading ? 0.7 : 1 }} disabled={loading}>
                            {loading ? 'PROCESSING...' : 'UPDATE SYSTEM ACCESS'}
                            {!loading && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
                        </button>

                    </form>

                    <div className="node-status">
                        <span className="line left"></span>
                        <span className="node-text">SECURE NODE: 771-ECC-09</span>
                        <span className="line right"></span>
                    </div>

                </div>

                <div className="security-footer-badges bottom-out">
                    <div className="sec-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                        AES-512 MEDICAL ENCRYPTION
                    </div>
                    <div className="sec-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                        AI MONITORING ACTIVE
                    </div>
                </div>

            </main>

            <footer className="reset-footer-bar">
                <div className="telemetry-readout">
                    <span>COORD: 34.0522 N, 118.2437 W</span>
                    <span className="divider">|</span>
                    <span>Uptime: 99.999%</span>
                </div>

                <div className="sync-status">
                    <span className="dot pulse"></span>
                    SYNCING WITH CORE AI...
                </div>
            </footer>
        </div>
    );
};
