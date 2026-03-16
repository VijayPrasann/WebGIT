import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StressLevelAssessment.css';

type StressLevel = 'Low' | 'Moderate' | 'High' | 'Chronic' | null;

export const StressLevelAssessment: React.FC = () => {
    const navigate = useNavigate();
    const [selectedStress, setSelectedStress] = useState<StressLevel>(null);

    const handleSelect = (level: StressLevel) => {
        setSelectedStress(level);
    };

    const handleFinalize = () => {
        if (!selectedStress) {
            alert('Please select a stress level before finalizing.');
            return;
        }

        console.log('Finalized assessment with stress level:', selectedStress);

        // Save selected stress level for final dashboard
        localStorage.setItem('spermAI_stressLevel', selectedStress);

        // Navigate to Sleep Metrics dashboard
        navigate('/sleep-metrics');
    };

    const handlePrevious = () => {
        navigate(-1);
    };

    return (
        <div className="stress-layout">

            {/* Top Navigation */}
            <header className="stress-header">
                <div className="header-brand-shield">
                    <div className="shield-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                        </svg>
                    </div>
                    <div className="shield-text">
                        <div className="shield-title">SPERM <span className="highlight-white">AI</span></div>

                    </div>
                </div>

                <div className="header-actions">
                    <button className="icon-button notification-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                    </button>
                    <button className="icon-button settings-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                    </button>

                    <div className="header-divider"></div>

                    <div className="user-profile">

                        <div className="user-avatar-circle">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="8" y="2" width="8" height="20" rx="3"></rect>
                                <line x1="12" y1="18" x2="12.01" y2="18"></line>
                            </svg>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="stress-main">

                <div className="assessment-card">
                    <div className="card-header">
                        <h1 className="stress-title">How would you rate your <span className="highlight-green">stress level</span>?</h1>
                        <p className="stress-subtitle">
                            Select the neural state that best reflects your current<br />
                            operational capacity.
                        </p>
                    </div>

                    <div className="stress-options">

                        {/* Low Stress */}
                        <div
                            className={`stress-option ${selectedStress === 'Low' ? 'selected' : ''}`}
                            onClick={() => handleSelect('Low')}
                        >
                            <div className="option-content">
                                <div className="option-icon-square low-stress">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#121c18" strokeWidth="2" strokeLinecap="round" fill="none"></path>
                                        <path d="M9 9h.01M15 9h.01" stroke="#121c18" strokeWidth="2" strokeLinecap="round"></path>
                                    </svg>
                                </div>
                                <div className="option-text">
                                    <h3>Low Stress</h3>
                                    <p>Generally relaxed and calm. Optimal performance levels maintained.</p>
                                </div>
                            </div>
                            <div className="radio-circle"></div>
                        </div>

                        {/* Moderate Stress */}
                        <div
                            className={`stress-option ${selectedStress === 'Moderate' ? 'selected' : ''}`}
                            onClick={() => handleSelect('Moderate')}
                        >
                            <div className="option-content">
                                <div className="option-icon-square moderate-stress">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 15h8" stroke="#121c18" strokeWidth="2" strokeLinecap="round"></path>
                                        <path d="M9 9h.01M15 9h.01" stroke="#121c18" strokeWidth="2" strokeLinecap="round"></path>
                                    </svg>
                                </div>
                                <div className="option-text">
                                    <h3>Moderate Stress</h3>
                                    <p>Occasional stressful periods. Baseline operational capacity is stable.</p>
                                </div>
                            </div>
                            <div className="radio-circle"></div>
                        </div>

                        {/* High Stress */}
                        <div
                            className={`stress-option ${selectedStress === 'High' ? 'selected' : ''}`}
                            onClick={() => handleSelect('High')}
                        >
                            <div className="option-content">
                                <div className="option-icon-square high-stress">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 16s1.5-2 4-2 4 2 4 2" stroke="#121c18" strokeWidth="2" strokeLinecap="round" fill="none"></path>
                                        <path d="M9 10h.01M15 10h.01" stroke="#121c18" strokeWidth="2" strokeLinecap="round"></path>
                                    </svg>
                                </div>
                                <div className="option-text">
                                    <h3>High Stress</h3>
                                    <p>Frequently stressed or anxious. Alert: Cognitive fatigue detected.</p>
                                </div>
                            </div>
                            <div className="radio-circle"></div>
                        </div>

                        {/* Chronic Stress */}
                        <div
                            className={`stress-option ${selectedStress === 'Chronic' ? 'selected' : ''}`}
                            onClick={() => handleSelect('Chronic')}
                        >
                            <div className="option-content">
                                <div className="option-icon-square chronic-stress">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <path d="M12 2L2 22h20L12 2z"></path>
                                        <line x1="12" y1="16" x2="12.01" y2="16" stroke="#121c18" strokeWidth="3" strokeLinecap="round"></line>
                                        <line x1="12" y1="8" x2="12" y2="13" stroke="#121c18" strokeWidth="3" strokeLinecap="round"></line>
                                    </svg>
                                </div>
                                <div className="option-text">
                                    <h3>Chronic Stress</h3>
                                    <p>Constant high stress levels. Critical Intervention Protocol recommended.</p>
                                </div>
                            </div>
                            <div className="radio-circle"></div>
                        </div>

                    </div>

                    <div className="card-actions">
                        <button className="btn-previous" onClick={handlePrevious}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Previous Phase
                        </button>

                        <button
                            className={`btn-finalize ${selectedStress ? 'ready' : ''}`}
                            onClick={handleFinalize}
                        >
                            Finalize Assessment
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>

            </main>

            {/* Bottom Footer Vitals Grid */}
            <footer className="vitals-footer">
                <div className="vitals-grid">
                    <div className="vital-card">
                        <span className="v-label">HEART RATE</span>
                        <span className="v-value">72 BPM</span>
                    </div>
                    <div className="vital-card">
                        <span className="v-label">SPO2</span>
                        <span className="v-value">99%</span>
                    </div>
                    <div className="vital-card">
                        <span className="v-label">FOCUS SCORE</span>
                        <span className="v-value">8.4/10</span>
                    </div>
                    <div className="vital-card">
                        <span className="v-label">TEMP</span>
                        <span className="v-value">36.6°C</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};
