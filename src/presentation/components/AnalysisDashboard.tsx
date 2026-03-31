import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AnalysisDashboard.css';

interface AIResultPayload {
    patient: {
        id: number;
        patient_name: string;
    };
    result: {
        morphology_percent: number;
        dfi_percent: number;
    };
    uploaded?: Array<{ file: string }>;
}

export const AnalysisDashboard: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSignOut = () => {
        // Clear cached patient details from previous sessions
        localStorage.clear();
        navigate('/login', { replace: true });
    };

    // Grab the payload passed from UploadSample via React Router state
    const data = location.state?.data as AIResultPayload | undefined;
    const initialAnalysisId = location.state?.analysisId as number | undefined;

    const analysisId = initialAnalysisId;

    // Fallbacks if user navigated directly for testing
    const patientName = data?.patient?.patient_name || "ANONYMOUS-774";
    const patientId = data?.patient?.id;
    const morphology = data?.result?.morphology_percent ?? 14.0;
    const dfi = data?.result?.dfi_percent ?? 12.0;

    // Fallback saving logic removed as Flask backend handles saving during upload

    const handleGeneratePDF = () => {
        if (analysisId) {
            window.open(`http://localhost:8000/api/analysis/pdf/${analysisId}`, '_blank');
        } else {
            alert("Analysis data is still saving, please wait a moment and try again.");
        }
    };

    // Generate a placeholder date layout exactly like the design
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(new Date());

    return (
        <div className="analysis-layout">
            {/* Header Navbar */}
            <header className="analysis-header">
                <div className="brand-section">
                    <div className="brand-logo-circle">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 6l3-3M6 18h12M10 18v-4M14 18v-4M8 10l8 8" />
                            <circle cx="10" cy="10" r="4" />
                        </svg>
                    </div>
                    <div className="brand-titles">
                        <h2>SPERMAI</h2>
                        <span>AI DIAGNOSTIC CORE V4.2</span>
                    </div>
                </div>



                <div className="header-actions">
                    <div className="status-pill">
                        <div className="status-dot"></div>
                        ANALYSIS COMPLETE
                    </div>
                    <button className="icon-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    </button>
                    <div className="user-profile-container">
                        <div className="user-avatar" onClick={() => setShowDropdown(!showDropdown)}>
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MedicOps" alt="Avatar" />
                        </div>
                        {showDropdown && (
                            <div className="profile-dropdown">
                                <button className="dropdown-item" onClick={handleSignOut}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="analysis-main">

                {/* Left Panel */}
                <div className="panel">
                    <div className="panel-card">
                        <div className="panel-title">SUBJECT IDENTIFICATION</div>

                        <div className="info-row">
                            <span className="info-label">SAMPLE ID</span>
                            <span className="info-value">{patientId ? `SAM-P-${patientId}` : 'SAM-P-001'}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">COLLECTION TIME</span>
                            <span className="info-value">{formattedDate}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">PATIENT REFERENCE</span>
                            <span className="info-value">{patientName.toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="panel-card">
                        <div className="panel-title">AI TELEMETRY FLUX</div>

                        <div className="telemetry-row">
                            <div className="t-header">
                                <span className="t-name">Neural Sync</span>
                                <span className="t-val">99.9%</span>
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill" style={{ width: '99%' }}></div>
                            </div>
                        </div>

                        <div className="telemetry-row">
                            <div className="t-header">
                                <span className="t-name">Data Clusters</span>
                                <span className="t-val">14,282</span>
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill" style={{ width: '68%' }}></div>
                            </div>
                        </div>

                        <div className="encryption-badge">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            Encryption active: AES-256
                        </div>
                    </div>
                </div>

                {/* Center Panel (Viewport View) */}
                <div className="viewport-panel">
                    {/* Placeholder image closely matching the requested neon green glowing cell UI */}
                    <div
                        className="viewport-container"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`, backgroundBlendMode: 'color-dodge', backgroundColor: '#0A311D' }}
                    >
                        <div className="viewport-overlay"></div>

                        <div className="rec-badge">
                            <span className="rec-red">REC</span>
                            <span className="fps-text">4K 60FPS</span>
                        </div>

                        <div className="viewport-titles">
                            <h2>DIAGNOSTIC VIEWPORT</h2>
                            <p>REAL-TIME MORPHOLOGY MAPPING</p>
                        </div>
                    </div>

                    <div className="viewport-subcards">
                        <div className="v-card">
                            <div className="v-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </div>
                            <div className="v-data">
                                <span className="v-label">VELOCITY MAP</span>
                                <span className="v-value">42.4<span>µm/s</span></span>
                            </div>
                        </div>
                        <div className="v-card">
                            <div className="v-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                            </div>
                            <div className="v-data">
                                <span className="v-label">FLUID PH</span>
                                <span className="v-value">7.4<span>ph</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel (Core Metrics) */}
                <div className="panel">
                    <div className="panel-title" style={{ marginBottom: 0 }}>CORE METRIC ANALYSIS</div>

                    <div className="core-metrics-list">

                        {/* Morphology Dynamic Card */}
                        <div className="metric-card warning">
                            <div className="mc-header">
                                <span className="mc-title">Morphology</span>
                                <span className="mc-badge">MODERATE RISK</span>
                            </div>
                            <div className="mc-value">
                                {morphology.toFixed(1)}<span>%</span>
                            </div>
                            <div className="mc-bar-container">
                                <div className="mc-bar">
                                    <div className="mc-bar-fill" style={{ width: `${morphology}%` }}></div>
                                </div>
                            </div>
                            <div className="mc-note">-1.5% below target threshold</div>
                        </div>

                        {/* DNA Fragmentation Dynamic Card */}
                        <div className="metric-card danger">
                            <div className="mc-header">
                                <span className="mc-title">DNA Fragmentation</span>
                                <span className="mc-badge">ACTION REQUIRED</span>
                            </div>
                            <div className="mc-value">
                                {dfi.toFixed(1)}<span>%</span>
                            </div>
                            <div className="mc-bar-container">
                                <div className="mc-bar">
                                    <div className="mc-bar-fill" style={{ width: `${dfi}%` }}></div>
                                </div>
                            </div>
                            <div className="mc-note">Elevated fragmentation detected</div>
                        </div>

                    </div>
                </div>

            </main>

            {/* Bottom Footer Actions */}
            <footer className="analysis-footer">
                <div className="footer-legal">
                    <span className="legal-text">Proprietary AI analysis by Elite Clinical Systems. Licensed for clinical use only.</span>
                    <div className="legal-links">
                        <a href="#eula">End User License Agreement</a>
                        <a href="#security">Data Security Protocol</a>
                    </div>
                </div>

                <div className="footer-actions">
                    <button className="btn-pdf" onClick={handleGeneratePDF}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        GENERATE REPORT PDF
                    </button>
                    <button className="btn-continue" onClick={() => navigate('/dashboard')}>
                        CONTINUE TO RECOMMENDATIONS
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                </div>
            </footer>
        </div>
    );
};
