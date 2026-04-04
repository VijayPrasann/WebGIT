// @ts-ignore
import { apiFetch } from '../../api';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPasswordPage.css';

export const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'EMAIL' | 'OTP'>('EMAIL');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState<string[]>(new Array(6).fill(''));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Auto-focus the first OTP input when stepping to OTP
        if (step === 'OTP' && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [step]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 1) return; // Prevent pasting multiple chars directly into one box

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto advance
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (!code[index] && index > 0) {
                // Move back if current is empty
                inputRefs.current[index - 1]?.focus();
            } else {
                // Just clear current
                const newCode = [...code];
                newCode[index] = '';
                setCode(newCode);
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/[^0-9]/g, '');
        if (pastedData) {
            const newCode = [...code];
            for (let i = 0; i < pastedData.length; i++) {
                if (i < 6) newCode[i] = pastedData[i];
            }
            setCode(newCode);

            // Focus the next empty logical input or the last one
            const nextIndex = Math.min(pastedData.length, 5);
            inputRefs.current[nextIndex]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (step === 'EMAIL') {
            if (!email) {
                setError('Email is required.');
                return;
            }
            setLoading(true);
            try {
                const response = await apiFetch('/forgot-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                // Let the frontend proceed even if the backend returns a mock ok
                // because we are mimicking a production flow.
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to send OTP.');
                }

                setSuccessMessage('OTP sent successfully to your email.');
                setStep('OTP');
            } catch (err: any) {
                setError(err.message || 'Server error. Please try again.');
            } finally {
                setLoading(false);
            }
            return;
        }

        if (step === 'OTP') {
            const finalCode = code.join('');
            if (finalCode.length !== 6) {
                setError("Please enter all 6 digits.");
                return;
            }

            setLoading(true);
            try {
                const response = await apiFetch('/verify-reset-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, otp: finalCode }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Invalid OTP.');
                }

                alert("Security code validated. Routing to Security Verification...");
                navigate('/reset-password', { state: { email } });
            } catch (err: any) {
                setError(err.message || 'Server error during verification.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="command-center-layout">
            {/* Header Navbar */}
            <header className="command-header">
                <div className="brand-section">
                    <div className="brand-logo-shield">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <path d="M9 12l2 2 4-4"></path>
                        </svg>
                    </div>
                    <div className="brand-titles">
                        <h2>SPERM AI</h2>
                    </div>
                </div>

                <div className="header-actions">
                    <div className="status-pill active">
                        <div className="status-dot"></div>
                        SECURE LINK ACTIVE
                    </div>
                    <button className="icon-btn settings-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </button>
                </div>
            </header>

            <main className="command-main">
                <div className="verification-card">

                    <div className="verification-shield-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <path d="M9 12l2 2 4-4"></path>
                        </svg>
                    </div>

                    <h1 className="verification-title">Verification Required</h1>

                    <p className="verification-subtitle">
                        Mission-critical access. Enter the 6-digit<br />
                        secure code sent to your email<br />

                    </p>

                    <form className="verification-form" onSubmit={handleSubmit}>

                        {error && <div style={{ color: '#ff4d4d', fontSize: '0.85rem', marginBottom: '1rem', width: '100%', textAlign: 'left', fontWeight: '600' }}>Error: {error}</div>}
                        {successMessage && <div style={{ color: '#2ee37f', fontSize: '0.85rem', marginBottom: '1rem', width: '100%', textAlign: 'left', fontWeight: '600' }}>{successMessage}</div>}

                        <div className="input-group" style={{ display: step === 'EMAIL' ? 'flex' : 'none', width: '100%', marginBottom: '2.5rem', textAlign: 'left', flexDirection: 'column', gap: '0.6rem' }}>
                            <div className="group-header">
                                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2ee37f', letterSpacing: '0.08em' }}>REGISTERED EMAIL</label>
                            </div>
                            <div className="input-field-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <div className="input-icon" style={{ position: 'absolute', left: '1rem', color: '#2ee37f', display: 'flex', alignItems: 'center' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </div>
                                <input
                                    type="email"
                                    className="dark-input"
                                    placeholder="doctor@hospital.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    required={step === 'EMAIL'}
                                    style={{ width: '100%', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1rem 1rem 1rem 3rem', color: '#ffffff', fontSize: '1rem', boxSizing: 'border-box' }}
                                />
                            </div>
                        </div>

                        {step === 'OTP' && (
                            <div className="otp-container">
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        maxLength={1}
                                        className="otp-input"
                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={handlePaste}
                                        disabled={loading}
                                    />
                                ))}
                            </div>
                        )}

                        <button type="submit" className="verify-btn" style={{ opacity: loading ? 0.7 : 1 }} disabled={loading}>
                            {loading ? 'PROCESSING...' : (step === 'EMAIL' ? 'SEND OTP' : 'VERIFY')}
                            {!loading && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
                        </button>
                    </form>

                    {step === 'OTP' && (
                        <div className="resend-container">
                            <span className="resend-text">Didn't receive the code?</span>
                            <button type="button" className="resend-btn" disabled={loading} onClick={() => {
                                setStep('EMAIL');
                                setCode(new Array(6).fill(''));
                                setSuccessMessage('');
                                setError('');
                            }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 1 0 2.13-5.87L21 8"></path></svg>
                                CHOOSE DIFFERENT EMAIL
                            </button>
                        </div>
                    )}

                    <div className="security-footer-badges">
                        <div className="sec-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            AES-256 BIT ENCRYPTION
                        </div>
                        <div className="sec-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                            BIOMETRIC BYPASS DISABLED
                        </div>
                    </div>
                </div>
            </main>

            <footer className="command-footer">
                <div className="user-profile-plate">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MedicOps" alt="Avatar" className="user-avatar" />
                    <div className="user-details">
                        <span className="user-name">Dr. Aris Thorne</span>
                        <span className="user-role">CHIEF MEDICAL OFFICER</span>
                    </div>
                </div>

                <div className="terminal-status-group">
                    <div className="status-item">
                        <span className="status-label">STATUS</span>
                        <span className="status-value ready"><span className="dot"></span> READY</span>
                    </div>
                    <div className="status-item">
                        <span className="status-label">TERMINAL</span>
                        <span className="status-value">ALPHA-09</span>
                    </div>
                    <div className="status-item">
                        <span className="status-label">PROTOCOL</span>
                        <span className="status-value encrypted">ENCRYPTED</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};
