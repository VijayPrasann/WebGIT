import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SleepMetrics.css';

export const SleepMetrics: React.FC = () => {
    const navigate = useNavigate();

    // State for interactive elements (optional, but good for future functionality)
    const [selectedSleepDuration, setSelectedSleepDuration] = useState<string | null>(null);
    const [selectedDailyAssessment, setSelectedDailyAssessment] = useState<string | null>(null);

    const handleGenerateReport = () => {
        console.log("Generating full bio-report...");

        // Save selected sleep metric for Dashboard mapping
        if (selectedSleepDuration) {
            localStorage.setItem('spermAI_sleepDuration', selectedSleepDuration);
        } else {
            localStorage.setItem('spermAI_sleepDuration', '7h 45m'); // Default visual fallback
        }

        // Navigate to final Lifestyle Summary
        navigate('/lifestyle-summary');
    };

    return (
        <div className="sleep-metrics-layout">

            {/* Top Navigation Header */}
            <header className="sleep-header">
                <div className="header-titles">
                    <h1 className="main-title">Sleep Metrics</h1>
                    <p className="sub-title">Real-time circadian rhythm synchronization</p>
                </div>

                <div className="header-actions">
                    <button className="icon-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                    </button>

                    <div className="user-profile">
                        <div className="user-avatar">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CommanderRex&backgroundColor=1fcb70" alt="Commander Rex" />
                        </div>

                    </div>
                </div>
            </header>

            {/* Main Dashboard Content */}
            <main className="sleep-main">

                {/* Top Section: System Efficiency & Sleep Phases */}
                <div className="dashboard-grid-top">

                    {/* Left: System Efficiency Ring */}
                    <div className="efficiency-card">
                        <h3 className="card-label">SYSTEM EFFICIENCY</h3>

                        <div className="efficiency-ring-container">
                            <svg className="efficiency-ring" viewBox="0 0 120 120">
                                <circle className="ring-background" cx="60" cy="60" r="54"></circle>
                                <circle className="ring-progress" cx="60" cy="60" r="54" strokeDasharray="339.29" strokeDashoffset="40.71"></circle>
                            </svg>
                            <div className="ring-content">
                                <div className="ring-value">88<span className="ring-percent">%</span></div>
                                <div className="ring-status">OPTIMAL</div>
                            </div>
                        </div>

                        <div className="efficiency-stats">
                            <div className="stat-column">
                                <span className="stat-label">DURATION</span>
                                <span className="stat-value">7h 42m</span>
                            </div>
                            <div className="stat-column">
                                <span className="stat-label">TARGET</span>
                                <span className="stat-value">8h 00m</span>
                            </div>
                            <div className="stat-column">
                                <span className="stat-label">CONSISTENCY</span>
                                <span className="stat-value highlight-green">High</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Sleep Phase Cards */}
                    <div className="sleep-phases-column">

                        {/* Deep Sleep */}
                        <div className="phase-card deep-sleep">
                            <div className="phase-header">
                                <div className="phase-info">
                                    <span className="phase-label">DEEP SLEEP</span>
                                    <span className="phase-value">2h 15m</span>
                                </div>
                                <div className="phase-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="phase-bar-track">
                                <div className="phase-bar-fill" style={{ width: '45%' }}></div>
                            </div>
                        </div>

                        {/* REM Phase */}
                        <div className="phase-card rem-phase">
                            <div className="phase-header">
                                <div className="phase-info">
                                    <span className="phase-label">REM PHASE</span>
                                    <span className="phase-value">1h 52m</span>
                                </div>
                                <div className="phase-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8c9fa8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </div>
                            </div>
                            <div className="phase-bar-track">
                                <div className="phase-bar-fill" style={{ width: '30%' }}></div>
                            </div>
                        </div>

                        {/* Light Sleep */}
                        <div className="phase-card light-sleep">
                            <div className="phase-header">
                                <div className="phase-info">
                                    <span className="phase-label">LIGHT SLEEP</span>
                                    <span className="phase-value">3h 35m</span>
                                </div>
                                <div className="phase-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="5"></circle>
                                        <line x1="12" y1="1" x2="12" y2="3"></line>
                                        <line x1="12" y1="21" x2="12" y2="23"></line>
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                        <line x1="1" y1="12" x2="3" y2="12"></line>
                                        <line x1="21" y1="12" x2="23" y2="12"></line>
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                    </svg>
                                </div>
                            </div>
                            <div className="phase-bar-track">
                                <div className="phase-bar-fill" style={{ width: '70%' }}></div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Section: Neural Input Logging */}
                <div className="neural-logging-section">

                    <div className="section-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                        <h2>Neural Input Logging</h2>
                    </div>

                    <div className="logging-grid">

                        {/* Sleep Duration Selection */}
                        <div className="log-group">
                            <h4 className="log-label">Average hours of sleep (Last 7 Days)</h4>
                            <div className="log-options">
                                <button
                                    className={`log-btn ${selectedSleepDuration === '4-5h' ? 'active' : ''}`}
                                    onClick={() => setSelectedSleepDuration('4-5h')}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm3 2h10v6H7V8z"></path>
                                    </svg>
                                    <span>4-5h</span>
                                </button>
                                <button
                                    className={`log-btn ${selectedSleepDuration === '5-6h' ? 'active' : ''}`}
                                    onClick={() => setSelectedSleepDuration('5-6h')}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm3 2h10v6H7V8z"></path>
                                    </svg>
                                    <span>5-6h</span>
                                </button>
                                <button
                                    className={`log-btn highlight ${selectedSleepDuration === '7-8h' ? 'active' : ''}`}
                                    onClick={() => setSelectedSleepDuration('7-8h')}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm3 2h10v6H7V8z"></path>
                                    </svg>
                                    <span>7-8h</span>
                                </button>
                                <button
                                    className={`log-btn ${selectedSleepDuration === '9h+' ? 'active' : ''}`}
                                    onClick={() => setSelectedSleepDuration('9h+')}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm3 2h10v6H7V8z"></path>
                                    </svg>
                                    <span>9h+</span>
                                </button>
                            </div>
                        </div>

                        {/* Daily Self-Assessment Selection */}
                        <div className="log-group">
                            <h4 className="log-label">Daily Self-Assessment</h4>
                            <div className="log-options">
                                <button
                                    className={`log-btn ${selectedDailyAssessment === 'POOR' ? 'active' : ''}`}
                                    onClick={() => setSelectedDailyAssessment('POOR')}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                    </svg>
                                    <span>POOR</span>
                                </button>
                                <button
                                    className={`log-btn ${selectedDailyAssessment === 'FAIR' ? 'active' : ''}`}
                                    onClick={() => setSelectedDailyAssessment('FAIR')}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="8" y1="15" x2="16" y2="15"></line>
                                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                    </svg>
                                    <span>FAIR</span>
                                </button>
                                <button
                                    className={`log-btn ${selectedDailyAssessment === 'GOOD' ? 'active' : ''}`}
                                    onClick={() => setSelectedDailyAssessment('GOOD')}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                    </svg>
                                    <span>GOOD</span>
                                </button>
                                <button
                                    className={`log-btn highlight ${selectedDailyAssessment === 'EXCELLENT' ? 'active' : ''}`}
                                    onClick={() => setSelectedDailyAssessment('EXCELLENT')}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                        <path d="M9 9h.01M15 9h.01"></path>
                                    </svg>
                                    <span>EXCELLENT</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Final Protocol Sync Footer Bar */}
                <div className="protocol-sync-bar">
                    <div className="sync-info">
                        <div className="sync-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                <polyline points="9 12 12 15 15 9"></polyline>
                            </svg>
                        </div>
                        <div className="sync-text">
                            <h3>Protocol Sync Complete</h3>
                            <p>Next diagnostic window: 22:00 Local Time</p>
                        </div>
                    </div>

                    <button className="btn-generate-report" onClick={handleGenerateReport}>
                        GENERATE FULL BIO-REPORT
                    </button>
                </div>

            </main>
        </div>
    );
};
