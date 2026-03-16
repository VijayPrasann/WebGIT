import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MetabolicInquiry.css';

type AlcoholStatus = 'Never' | 'Occasional' | 'Moderate' | 'Frequent' | 'Heavy' | null;

export const MetabolicInquiry: React.FC = () => {
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState<AlcoholStatus>(null);

    const handleSelect = (status: AlcoholStatus) => {
        setSelectedStatus(status);
    };

    const handleSubmit = () => {
        if (!selectedStatus) {
            alert('Please select an option before continuing.');
            return;
        }

        console.log('Selected alcohol status:', selectedStatus);

        // Save for Bio Report Dashboard
        localStorage.setItem('spermAI_alcoholStatus', selectedStatus as string);

        // Transition to Stress Level
        navigate('/stress-assessment');
    };

    const handlePrevious = () => {
        navigate(-1);
    };

    return (
        <div className="metabolic-layout">

            {/* Top Navigation */}
            <header className="metabolic-header">
                <div className="header-brand-shield">
                    <div className="shield-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <polyline points="9 12 12 15 15 9"></polyline>
                        </svg>
                    </div>
                    <div className="shield-text">
                        <div className="shield-title">SPERMAI</div>

                    </div>
                </div>

                <div className="header-actions">
                    <button className="icon-button notification-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                    </button>
                    <button className="icon-button profile-btn active-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="metabolic-main">

                <div className="inquiry-header">
                    <div className="pill-badge">METABOLIC INQUIRY</div>
                    <h1 className="inquiry-title">How often do you consume alcohol?</h1>
                    <p className="inquiry-subtitle">
                        This information helps our AI engine calibrate your biological age<br />
                        and recovery metrics.
                    </p>
                </div>

                <div className="options-stack">

                    {/* Option 1 */}
                    <div
                        className={`row-option ${selectedStatus === 'Never' ? 'selected' : ''}`}
                        onClick={() => handleSelect('Never')}
                    >
                        <div className="option-content">
                            <div className="option-icon-square">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="8" y1="12" x2="16" y2="12"></line>
                                </svg>
                            </div>
                            <div className="option-text">
                                <h3>Never / Very rarely</h3>
                                <p>No alcohol consumption at all</p>
                            </div>
                        </div>
                        <div className="radio-circle"></div>
                    </div>

                    {/* Option 2 */}
                    <div
                        className={`row-option ${selectedStatus === 'Occasional' ? 'selected' : ''}`}
                        onClick={() => handleSelect('Occasional')}
                    >
                        <div className="option-content">
                            <div className="option-icon-square">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M8 22h8"></path>
                                    <path d="M12 15v7"></path>
                                    <path d="M16.5 7h-9"></path>
                                    <path d="M18 3l-2 7.5a4 4 0 0 1-8 0L6 3h12z"></path>
                                </svg>
                            </div>
                            <div className="option-text">
                                <h3>Occasional</h3>
                                <p>1-2 drinks per week (Light social)</p>
                            </div>
                        </div>
                        <div className="radio-circle"></div>
                    </div>

                    {/* Option 3 */}
                    <div
                        className={`row-option ${selectedStatus === 'Moderate' ? 'selected' : ''}`}
                        onClick={() => handleSelect('Moderate')}
                    >
                        <div className="option-content">
                            <div className="option-icon-square">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 4h14l-1.5 16H6.5L5 4z"></path>
                                    <path d="M6 9h12"></path>
                                </svg>
                            </div>
                            <div className="option-text">
                                <h3>Moderate</h3>
                                <p>3-7 drinks per week (Regular intake)</p>
                            </div>
                        </div>
                        <div className="radio-circle"></div>
                    </div>

                    {/* Option 4 */}
                    <div
                        className={`row-option ${selectedStatus === 'Frequent' ? 'selected' : ''}`}
                        onClick={() => handleSelect('Frequent')}
                    >
                        <div className="option-content">
                            <div className="option-icon-square">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="4" y="2" width="6" height="20" rx="1" ry="1"></rect>
                                    <rect x="14" y="6" width="6" height="16" rx="1" ry="1"></rect>
                                    <line x1="4" y1="8" x2="10" y2="8"></line>
                                    <line x1="14" y1="12" x2="20" y2="12"></line>
                                    <path d="M7 2v2M17 6v2"></path>
                                </svg>
                            </div>
                            <div className="option-text">
                                <h3>Frequent</h3>
                                <p>7-14 drinks per week (Higher average)</p>
                            </div>
                        </div>
                        <div className="radio-circle"></div>
                    </div>

                    {/* Option 5 */}
                    <div
                        className={`row-option ${selectedStatus === 'Heavy' ? 'selected' : ''}`}
                        onClick={() => handleSelect('Heavy')}
                    >
                        <div className="option-content">
                            <div className="option-icon-square">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                    <line x1="12" y1="9" x2="12" y2="13"></line>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                            </div>
                            <div className="option-text">
                                <h3>Heavy</h3>
                                <p>More than 14 drinks per week (Clinical usage)</p>
                            </div>
                        </div>
                        <div className="radio-circle"></div>
                    </div>

                </div>

                <div className="bottom-actions">
                    <button className="btn-previous" onClick={handlePrevious}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Previous
                    </button>

                    <button
                        className={`btn-submit ${selectedStatus ? 'ready' : ''}`}
                        onClick={handleSubmit}
                    >
                        Submit Analysis
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="8" y1="12" x2="8" y2="17"></line>
                            <line x1="12" y1="10" x2="12" y2="17"></line>
                            <line x1="16" y1="6" x2="16" y2="17"></line>
                        </svg>
                    </button>
                </div>

            </main>

            {/* Bottom Footer Stats */}
            <footer className="telemetry-footer">
                <div className="telemetry-item">
                    <span className="t-label">LATENCY</span>
                    <span className="t-value">14ms</span>
                </div>
                <div className="telemetry-item">
                    <span className="t-label">ENCRYPTION</span>
                    <span className="t-value">AES-256</span>
                </div>
                <div className="telemetry-item">
                    <span className="t-label">PROTOCOL</span>
                    <span className="t-value">HTTPS/3</span>
                </div>
                <div className="telemetry-item">
                    <span className="t-label">NEURAL LOAD</span>
                    <span className="t-value">0.08%</span>
                </div>
            </footer>
        </div>
    );
};
