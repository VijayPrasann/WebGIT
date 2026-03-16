import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PolicyDashboard.css';

export const PolicyDashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="policy-layout">
            {/* Header / Navigation */}
            <header className="policy-header">
                <button className="back-button" onClick={() => navigate('/dashboard')}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
                <div className="breadcrumb">Dashboard / Settings</div>

                <div className="header-right">
                    <div className="protocol-status">
                        <div className="status-title">GEN-OME ALPHA</div>
                        <div className="status-badge">PROTOCOL ACTIVE</div>
                    </div>
                    <div className="dna-icon-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 2v2M15 20v2M9 2v2M9 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 15h2M20 15h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M2 9h2M20 9h2"></path>
                            <circle cx="12" cy="12" r="4"></circle>
                        </svg>
                    </div>
                </div>
            </header>

            <main className="policy-main">
                {/* Title Section */}
                <div className="title-section">
                    <div className="encryption-pill">ENCRYPTION STANDARD V4.2</div>
                    <h1 className="page-title">Policy & <span className="highlight">Ethics Framework</span></h1>
                    <p className="page-subtitle">
                        Our AI-powered fertility analysis operates under a strict transparency protocol,
                        ensuring clinical-grade privacy and ethical human-centered design.
                    </p>
                </div>

                {/* Cards Section */}
                <div className="cards-container">

                    {/* Left Column */}
                    <div className="policy-column">
                        <div className="column-header">
                            <div className="icon-wrapper">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </div>
                            <h2>Data Usage Policy</h2>
                            {/* Faded shield background icon effect */}
                            <div className="bg-icon-shield">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" opacity="0.1">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                        </div>

                        <div className="policy-item">
                            <div className="item-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <div className="item-content">
                                <h3>Quantum-Ready Encryption</h3>
                                <p>End-to-end AES-256 protocols securing every byte of your biological data from transit to rest.</p>
                            </div>
                        </div>

                        <div className="policy-item">
                            <div className="item-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <div className="item-content">
                                <h3>Sovereign Data Rights</h3>
                                <p>You retain absolute ownership. We never monetize or distribute raw fertility profiles to third parties.</p>
                            </div>
                        </div>

                        <div className="policy-item">
                            <div className="item-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                    <line x1="8" y1="21" x2="16" y2="21"></line>
                                    <line x1="12" y1="17" x2="12" y2="21"></line>
                                </svg>
                            </div>
                            <div className="item-content">
                                <h3>Distributed Secure Storage</h3>
                                <p>HIPAA-compliant, audited cloud infrastructure with real-time threat detection and mitigation.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="policy-column">
                        <div className="column-header">
                            <div className="icon-wrapper">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 16v-4"></path>
                                    <path d="M12 8h.01"></path>
                                </svg>
                            </div>
                            <h2>AI Ethics & Transparency</h2>
                            {/* Faded brain background icon effect */}
                            <div className="bg-icon-brain">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" opacity="0.1">
                                    <path d="M12 3a9 9 0 0 0-9 9c0 4.1 2.8 7.6 6.6 8.7L12 22l2.4-1.3C18.2 19.6 21 16.1 21 12a9 9 0 0 0-9-9z"></path>
                                </svg>
                            </div>
                        </div>

                        <div className="policy-item">
                            <div className="item-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </div>
                            <div className="item-content">
                                <h3>Explainable Logic (XAI)</h3>
                                <p>Clear clinical reasoning provided for every prediction, eliminating "black box" algorithmic uncertainty.</p>
                            </div>
                        </div>

                        <div className="policy-item">
                            <div className="item-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="3" x2="12" y2="21"></line>
                                    <path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                </svg>
                            </div>
                            <div className="item-content">
                                <h3>Diversity-Centric Learning</h3>
                                <p>Models trained on global datasets to mitigate demographic bias and ensure universal accuracy.</p>
                            </div>
                        </div>

                        <div className="policy-item">
                            <div className="item-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <div className="item-content">
                                <h3>Hybrid Human Oversight</h3>
                                <p>AI functions as a high-precision tool for medical specialists, not a clinical replacement.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Disclaimer Banner */}
                <div className="disclaimer-banner">
                    <div className="disclaimer-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#a48d35" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" stroke="#121815" strokeWidth="2" strokeLinecap="round" />
                            <line x1="12" y1="17" x2="12.01" y2="17" stroke="#121815" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="disclaimer-content">
                        <h4>PROTOCOL DISCLAIMER</h4>
                        <p>
                            This analysis platform is designated for educational and clinical research purposes. It provides data correlations and
                            patterns but does not constitute a definitive medical diagnosis. Confidential health information should only be shared
                            within the designated secure encrypted modules. Always validate AI findings with your fertility specialist.
                        </p>
                    </div>
                </div>

                {/* Action Section */}
                <div className="action-section">
                    <button className="btn-initialize" onClick={() => navigate('/consent')}>
                        INITIALIZE ANALYSIS PIPELINE
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                    <div className="verification-text">
                        VERIFICATION PROTOCOL REQUIRED • <span className="text-green">READY TO PROCEED</span>
                    </div>

                    {/* Console / Terminal text at bottom left */}
                    <div className="terminal-logs">
                        <div>&gt;_ SYSTEM_STATUS: OPERATIONAL</div>
                        <div>&gt;_ ENCRYPTION: active_aes256</div>
                        <div>&gt;_ BIOMETRIC_HASH: 0x82...F41</div>
                    </div>
                </div>
            </main>
        </div>
    );
};
