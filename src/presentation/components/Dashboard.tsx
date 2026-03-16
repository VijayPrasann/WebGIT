import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="dashboard-layout">
            {/* Top Navigation Bar */}
            <header className="dashboard-header">
                <div className="header-brand">
                    <svg className="brand-logo" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 6l3-3M6 18h12M10 18v-4M14 18v-4M8 10l8 8" />
                        <circle cx="10" cy="10" r="4" />
                    </svg>
                    <span>SPERMAI</span>
                </div>
                <nav className="dashboard-header-nav">
                    <a href="/" onClick={(e) => e.preventDefault()} className="dashboard-nav-link active">Dashboard</a>
                    <a href="/history" onClick={(e) => { e.preventDefault(); navigate('/history'); }} className="dashboard-nav-link">Analysis History</a>
                    <a href="/" onClick={(e) => e.preventDefault()} className="dashboard-nav-link">Support</a>
                    <button className="btn-signout" onClick={() => {
                        localStorage.clear();
                        navigate('/login', { replace: true });
                    }}>Sign Out</button>
                    <div className="dashboard-user-avatar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                </nav>
            </header>

            {/* Main Content Area */}
            <main className="dashboard-main">
                <div className="dashboard-content-wrapper">

                    {/* Left Side: Graphic Card */}
                    <div className="dashboard-graphic-side">
                        <div className="graphic-card">
                            <div className="graphic-symbol-top-right">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1fcb70" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="8" r="4" />
                                    <circle cx="8" cy="16" r="4" />
                                    <circle cx="16" cy="16" r="4" />
                                </svg>
                            </div>

                            <div className="graphic-center-icon">
                                <svg width="64" height="64" viewBox="0 0 100 80" fill="#1fcb70" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="10" y="10" width="80" height="60" rx="10" fill="#1fcb70" />
                                    <rect x="25" y="25" width="20" height="15" fill="#154226" />
                                </svg>
                            </div>

                            <div className="graphic-symbol-bottom-left">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 3H15M10 3V12L5 20H19L14 12V3" fill="#1fcb70" />
                                </svg>
                            </div>
                        </div>

                        <div className="graphic-caption">
                            <h3>High-Precision Analysis</h3>
                            <p>Leveraging neural networks for clinical-grade morphology assessment.</p>
                        </div>
                    </div>

                    {/* Right Side: Text & Steps */}
                    <div className="dashboard-info-side">
                        <div className="session-badge">NEW SESSION</div>
                        <h1 className="dashboard-title">Begin AI Analysis</h1>
                        <p className="dashboard-description">
                            Follow these three simple steps to get your detailed fertility insights. Our AI ensures privacy and accuracy at every stage.
                        </p>

                        <div className="analysis-steps">
                            <div className="step-item">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h3>Upload or Capture Sample</h3>
                                    <p>Securely provide your sample data via high-res upload or direct capture.</p>
                                </div>
                            </div>

                            <div className="step-item">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h3>AI Processing</h3>
                                    <p>Advanced neural networks analyze morphology and motility patterns in seconds.</p>
                                </div>
                            </div>

                            <div className="step-item">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h3>Review Detailed Results</h3>
                                    <p>Access your comprehensive digital health report and clinical insights.</p>
                                </div>
                            </div>
                        </div>

                        <button className="btn-start-analysis" onClick={() => navigate('/policy')}>
                            Start Analysis
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>

                        <div className="security-notice">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                            HIPAA Compliant & End-to-End Encrypted
                        </div>
                    </div>
                </div>
            </main>

            <footer className="dashboard-footer">
                <p>&copy; 2024 FertilityAI Medical Systems. All rights reserved.</p>
            </footer>
        </div>
    );
};
