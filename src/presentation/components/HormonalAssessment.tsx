import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HormonalAssessment.css';

export const HormonalAssessment: React.FC = () => {
    const navigate = useNavigate();

    // State to track which cards are selected - allowing multiple selections
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

    const toggleCondition = (conditionId: string) => {
        if (selectedConditions.includes(conditionId)) {
            setSelectedConditions(selectedConditions.filter(id => id !== conditionId));
        } else {
            setSelectedConditions([...selectedConditions, conditionId]);
        }
    };

    const handleContinue = () => {
        // Save to local storage for final Bio Report mapping
        localStorage.setItem('spermAI_hormonalConditions', JSON.stringify(selectedConditions));

        console.log('Selected Hormonal Conditions:', selectedConditions);

        // Navigate to Metabolic Inquiry (Alcohol)
        navigate('/metabolic-inquiry');
    };

    const handleBack = () => {
        navigate(-1); // Go back to the previous screen (Smoking/Health Assessment)
    };

    return (
        <div className="hormonal-layout">

            {/* Top Navigation Bar */}
            <header className="elite-header">
                <div className="elite-brand">
                    <div className="elite-logo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                    </div>
                    <div className="brand-text">
                        <h2>SPERMAI</h2>
                        <span className="system-status">SYSTEM STATUS: OPTIMAL</span>
                    </div>
                </div>

                <nav className="elite-nav">
                    <a href="#dash" className="nav-link">DASHBOARD</a>
                    <a href="#assessment" className="nav-link active">ASSESSMENT</a>
                    <a href="#vitals" className="nav-link">VITALS</a>

                    <button className="nav-icon-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    </button>
                    <button className="nav-icon-btn user-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </button>
                </nav>
            </header>

            <main className="hormonal-main">

                {/* Title Section */}
                <div className="title-section">
                    <div className="protocol-badge">
                        <div className="line"></div>
                        <span>PROTOCOL ALPHA-7</span>
                    </div>

                    <div className="title-row">
                        <div className="title-content">
                            <h1>Hormonal Assessment</h1>
                            <p>Initialize mission-critical biological optimization. Identify primary endocrine conditions to calibrate your command profile.</p>
                        </div>


                    </div>
                </div>

                {/* Filter Dropdowns */}
                <div className="filters-row">
                    <div className="dropdown">
                        <span>PRIORITY</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <div className="dropdown">
                        <span>METABOLIC</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <div className="dropdown">
                        <span>GLANDULAR</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <div className="dropdown">
                        <span>CHRONIC</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>

                {/* Conditions Grid */}
                <div className="conditions-grid">

                    {/* Diabetes Card */}
                    <div
                        className={`condition-card ${selectedConditions.includes('diabetes') ? 'selected' : ''}`}
                        onClick={() => toggleCondition('diabetes')}
                    >
                        <div className="card-top">
                            <div className="icon diabetes-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path><line x1="12" y1="12" x2="12" y2="16"></line><line x1="10" y1="14" x2="14" y2="14"></line></svg>
                            </div>
                            <div className="checkbox"></div>
                        </div>
                        <div className="card-body">
                            <h3>Diabetes Mellitus</h3>
                            <p>Insulin production and glucose regulation assessment for sustained mission energy.</p>
                        </div>
                        <div className="card-footer">
                            <span className="category green">TYPE I & II PROTOCOLS</span>
                            <button className="info-btn">i</button>
                        </div>
                    </div>

                    {/* Thyroid Card */}
                    <div
                        className={`condition-card ${selectedConditions.includes('thyroid') ? 'selected' : ''}`}
                        onClick={() => toggleCondition('thyroid')}
                    >
                        <div className="card-top">
                            <div className="icon generic-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                            </div>
                            <div className="checkbox"></div>
                        </div>
                        <div className="card-body">
                            <h3>Thyroid Disorders</h3>
                            <p>Metabolic rate calibration including hypo and hyperthyroidism diagnostic markers.</p>
                        </div>
                        <div className="card-footer">
                            <span className="category">METABOLIC ENGINE</span>
                            <button className="info-btn">i</button>
                        </div>
                    </div>

                    {/* Low T Card */}
                    <div
                        className={`condition-card ${selectedConditions.includes('low_t') ? 'selected' : ''}`}
                        onClick={() => toggleCondition('low_t')}
                    >
                        <div className="card-top">
                            <div className="icon generic-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="18" y2="18"></line><line x1="6" y1="18" x2="18" y2="6"></line><circle cx="5" cy="5" r="3"></circle><circle cx="19" cy="5" r="3"></circle><circle cx="5" cy="19" r="3"></circle><circle cx="19" cy="19" r="3"></circle></svg>
                            </div>
                            <div className="checkbox"></div>
                        </div>
                        <div className="card-body">
                            <h3>Low Testosterone</h3>
                            <p>Optimizing androgenic profiles for peak physical performance and cognitive clarity.</p>
                        </div>
                        <div className="card-footer">
                            <span className="category">PERFORMANCE INDEX</span>
                            <button className="info-btn">i</button>
                        </div>
                    </div>

                    {/* Pituitary Card */}
                    <div
                        className={`condition-card ${selectedConditions.includes('pituitary') ? 'selected' : ''}`}
                        onClick={() => toggleCondition('pituitary')}
                    >
                        <div className="card-top">
                            <div className="icon generic-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 0-5 5v5l-3 4v2h16v-2l-3-4V7a5 5 0 0 0-5-5z"></path><path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2z"></path><circle cx="12" cy="11" r="2"></circle></svg>
                            </div>
                            <div className="checkbox"></div>
                        </div>
                        <div className="card-body">
                            <h3>Pituitary Disorders</h3>
                            <p>Master gland analysis for comprehensive endocrine signal synchronization.</p>
                        </div>
                        <div className="card-footer">
                            <span className="category">NEURAL CORE HUB</span>
                            <button className="info-btn">i</button>
                        </div>
                    </div>

                    {/* Adrenal Card */}
                    <div
                        className={`condition-card ${selectedConditions.includes('adrenal') ? 'selected' : ''}`}
                        onClick={() => toggleCondition('adrenal')}
                    >
                        <div className="card-top">
                            <div className="icon generic-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                            </div>
                            <div className="checkbox"></div>
                        </div>
                        <div className="card-body">
                            <h3>Adrenal Insufficiency</h3>
                            <p>Stress response and cortisol regulation for mission resilience under pressure.</p>
                        </div>
                        <div className="card-footer">
                            <span className="category">RESILIENCE FACTOR</span>
                            <button className="info-btn">i</button>
                        </div>
                    </div>

                    {/* Other Card */}
                    <div className="condition-card other-card">
                        <div className="other-content">
                            <div className="add-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </div>
                            <h3>Other Condition</h3>
                            <p>Define custom mission parameters</p>
                        </div>
                    </div>

                </div>

                {/* Bottom Action Footer */}
                <div className="action-footer">
                    <div className="footer-status">
                        <div className="icon-box">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
                        </div>
                        <div className="status-text">
                            <h4>Neural Core Synchronization</h4>
                            <p>Our AI will process these selections to build your endocrine baseline.</p>
                        </div>
                    </div>

                    <div className="footer-buttons">
                        <button className="btn-back" onClick={handleBack}>BACK</button>
                        <button className="btn-continue" onClick={handleContinue}>CONTINUE ASSESSMENT</button>
                    </div>
                </div>

            </main>

            {/* Micro Footer */}
            <footer className="micro-footer">
                <div className="left-f">
                    <div className="dot"></div>
                    <span>ENCRYPTED CONNECTION ACTIVE</span>
                </div>
                <div className="center-f">
                    <span>© 2024 ELITE COMMAND CENTER • BIOMETRIC DIVISION</span>
                </div>
                <div className="right-f">
                    <a href="#legal">LEGAL</a>
                    <a href="#privacy">PRIVACY</a>
                    <a href="#support">SUPPORT</a>
                </div>
            </footer>
        </div>
    );
};
