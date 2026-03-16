import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HealthAssessment.css';

type SmokingStatus = 'Never' | 'Ex-Smoker' | 'Occasionally' | null;

export const HealthAssessment: React.FC = () => {
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState<SmokingStatus>(null);

    const handleSelect = (status: SmokingStatus) => {
        setSelectedStatus(status);
    };

    const handleContinue = () => {
        if (!selectedStatus) {
            alert('Please select an option before continuing.');
            return;
        }

        console.log('Selected smoking status:', selectedStatus);

        // Save selection for Bio Report Dashboard
        localStorage.setItem('spermAI_smokingStatus', selectedStatus as string);

        // This is where you would typically save to context, redux or POST to backend
        // For the UI flow, we'll navigate to the next step
        navigate('/hormonal-assessment');
    };

    const handleSkip = () => {
        console.log('User preferred not to say');
        localStorage.setItem('spermAI_smokingStatus', 'Elite (Undisclosed)');
        navigate('/hormonal-assessment');
    };

    return (
        <div className="assessment-layout">

            {/* Top Navigation */}
            <header className="assessment-header">
                <div className="header-brand">
                    <div className="brand-logo-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                    </div>
                    <div className="brand-text">
                        <div className="brand-name">SPERM<span className="brand-light">AI</span></div>
                        <div className="brand-sub">ELITE DIAGNOSTICS</div>
                    </div>
                </div>

                <div className="header-actions">
                    <button className="icon-button">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                    </button>
                    <button className="icon-button active-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="assessment-main">



                {/* Question Area */}
                <div className="question-container">
                    <h1 className="question-text">Do you smoke?</h1>
                    <p className="question-subtext">
                        This information helps our AI more accurately predict<br />
                        hormonal impact and follicle health.
                    </p>
                </div>

                {/* Options Grid */}
                <div className="options-grid">

                    {/* Option 1: Never */}
                    <div
                        className={`option-card ${selectedStatus === 'Never' ? 'selected' : ''}`}
                        onClick={() => handleSelect('Never')}
                    >
                        {selectedStatus === 'Never' && (
                            <div className="check-badge">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                        )}
                        <div className="option-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                {/* Cigarette */}
                                <rect x="2" y="11" width="16" height="4" rx="1"></rect>
                                <line x1="8" y1="11" x2="8" y2="15"></line>
                                <line x1="18" y1="13" x2="21" y2="13"></line>
                                {/* Smoke (crossed out) */}
                                <path d="M19 8c0-1.5 1.5-2 1.5-3.5"></path>
                                <line x1="4" y1="4" x2="20" y2="20"></line>
                            </svg>
                        </div>
                        <h3>Never</h3>
                        <p>I have never used tobacco or nicotine products.</p>
                    </div>

                    {/* Option 2: Ex-Smoker */}
                    <div
                        className={`option-card ${selectedStatus === 'Ex-Smoker' ? 'selected' : ''}`}
                        onClick={() => handleSelect('Ex-Smoker')}
                    >
                        {selectedStatus === 'Ex-Smoker' && (
                            <div className="check-badge">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                        )}
                        <div className="option-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                {/* Broken/Snuffed Cigarette */}
                                <path d="M4 15l4-4"></path>
                                <path d="M10 9l4-4"></path>
                                <path d="M16 12l4 4"></path>
                                <path d="M10 17l4 4"></path>
                                <rect x="6" y="11" width="12" height="4" rx="1" transform="rotate(-45 12 13)"></rect>
                            </svg>
                        </div>
                        <h3>Ex-Smoker</h3>
                        <p>I have quit smoking successfully in the past.</p>
                    </div>

                    {/* Option 3: Occasionally */}
                    <div
                        className={`option-card ${selectedStatus === 'Occasionally' ? 'selected' : ''}`}
                        onClick={() => handleSelect('Occasionally')}
                    >
                        {selectedStatus === 'Occasionally' && (
                            <div className="check-badge">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                        )}
                        <div className="option-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                {/* Cigarette */}
                                <rect x="2" y="14" width="16" height="4" rx="1"></rect>
                                <line x1="8" y1="14" x2="8" y2="18"></line>
                                <line x1="18" y1="16" x2="22" y2="16"></line>
                                {/* Smoke Trails */}
                                <path d="M18 11c0-2-1.5-2.5-1.5-4s1.5-2 1.5-4"></path>
                                <path d="M22 11c0-1.5-1-2-1-3.5"></path>
                            </svg>
                        </div>
                        <h3>Occasionally</h3>
                        <p>I currently smoke or use nicotine occasionally.</p>
                    </div>

                </div>

                {/* Validation Actions */}
                <div className="assessment-actions">
                    <button
                        className={`btn-assessment ${selectedStatus ? 'ready' : ''}`}
                        onClick={handleContinue}
                    >
                        Continue Assessment
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>

                    <button className="btn-skip" onClick={handleSkip}>
                        I'd rather not say
                    </button>
                </div>

            </main>
        </div>
    );
};
