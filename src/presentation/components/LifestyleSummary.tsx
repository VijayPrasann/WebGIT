import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LifestyleSummary.css';

export const LifestyleSummary: React.FC = () => {
    const navigate = useNavigate();

    // State for mapped data
    const [summaryData, setSummaryData] = useState({
        age: '--',
        bmi: '--',
        bmiStatus: 'Normal',
        smokingStatus: 'Unknown',
        alcoholConsumption: 'Unknown',
        stressLevel: 'Unknown',
        sleepDuration: 'Unknown'
    });

    useEffect(() => {
        // Fetch saved user data
        const age = localStorage.getItem('spermAI_userAge') || '32'; // Fallback to 32 to match mockup visual if empty
        const heightList = localStorage.getItem('spermAI_userHeight')?.split(' ');
        const weight = localStorage.getItem('spermAI_userWeight');

        // Calculate rough BMI if we have height in cm and weight in kg
        let calculatedBmi = '24.5';
        if (heightList && weight) {
            const h = parseFloat(heightList[0]);
            const w = parseFloat(weight);
            if (!isNaN(h) && !isNaN(w) && h > 0) {
                const hMeters = h / 100;
                const bmiVal = (w / (hMeters * hMeters)).toFixed(1);
                calculatedBmi = bmiVal;
            }
        }

        const smoke = localStorage.getItem('spermAI_smokingStatus') || 'Never Smoked';
        const alcohol = localStorage.getItem('spermAI_alcoholStatus') || 'Occasional';
        const stress = localStorage.getItem('spermAI_stressLevel') || 'Moderate';
        const sleep = localStorage.getItem('spermAI_sleepDuration') || '7-8 Hours';

        setSummaryData({
            age: age,
            bmi: calculatedBmi,
            bmiStatus: parseFloat(calculatedBmi) < 18.5 ? 'Underweight' : parseFloat(calculatedBmi) > 25 ? 'Overweight' : 'Normal',
            smokingStatus: smoke,
            alcoholConsumption: alcohol,
            stressLevel: stress,
            sleepDuration: sleep
        });

    }, []);

    const handleConfirm = () => {
        // Final routing action to the Mission-Critical Upload portal
        navigate('/upload');
    };

    // Helper logic for rendering dynamic status bars
    const renderStressBars = () => {
        const level = summaryData.stressLevel.toLowerCase();
        let segments = 0;
        if (level.includes('low')) segments = 1;
        if (level.includes('moderate')) segments = 2;
        if (level.includes('high')) segments = 3;
        if (level.includes('chronic')) segments = 4;

        // Mockup shows 3 bars with some filled
        return (
            <div className="stress-bars">
                <div className={`stress-bar ${segments >= 1 ? 'filled' : ''}`}></div>
                <div className={`stress-bar ${segments >= 2 ? 'filled' : ''}`}></div>
                <div className={`stress-bar ${segments >= 3 ? 'filled' : ''}`}></div>
            </div>
        );
    };

    return (
        <div className="lifestyle-layout">

            <header className="brand-header">
                <div className="brand">
                    <div className="brand-logo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                    </div>
                    <div className="brand-titles">
                        <h2>SPERMAI</h2>

                    </div>
                </div>

                <div className="header-actions">
                    <button className="icon-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    </button>
                    <button className="icon-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </button>
                    <div className="user-avatar">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CommanderRex" alt="User" />
                    </div>
                </div>
            </header>

            <main className="lifestyle-main">

                {/* Title Area */}
                <div className="title-area">
                    <div className="title-left">
                        <div className="medical-label">
                            <div className="line"></div>
                            <span>MEDICAL ANALYSIS</span>
                        </div>
                        <h1>LIFESTYLE SUMMARY</h1>
                        <p>Deep synthesis of patient biometric markers and habitual behavioral patterns for optimal clinical assessment.</p>
                    </div>

                    <button className="edit-profile-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        Edit Profile
                    </button>
                </div>

                {/* Top 3 Metric Cards */}
                <div className="metric-cards-row">

                    <div className="metric-card">
                        <div className="card-bg-icon pt-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"></circle><path d="M5 22v-5l-1-1v-4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4l-1 1v5"></path><path d="M9 12v9"></path><path d="M15 12v9"></path><path d="M10 8V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"></path></svg>
                        </div>
                        <span className="card-title">PATIENT AGE</span>
                        <div className="card-value-lg">
                            {summaryData.age} <span>Years</span>
                        </div>
                        <div className="card-footer-pill">
                            <span>OPTIMAL RANGE</span>
                        </div>
                    </div>

                    <div className="metric-card">
                        <div className="card-bg-icon pb-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        </div>
                        <span className="card-title">BODY MASS INDEX</span>
                        <div className="card-value-lg">
                            {summaryData.bmi} <span className="light">{summaryData.bmiStatus}</span>
                        </div>
                        <div className="bmi-bar">
                            <div className="bmi-fill" style={{ width: '65%' }}></div>
                        </div>
                    </div>

                    <div className="metric-card">
                        <div className="card-bg-icon pf-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="18" y2="18"></line><line x1="6" y1="18" x2="18" y2="6"></line><circle cx="5" cy="5" r="3"></circle><circle cx="19" cy="5" r="3"></circle><circle cx="5" cy="19" r="3"></circle><circle cx="19" cy="19" r="3"></circle></svg>
                        </div>
                        <span className="card-title">EXERCISE FREQUENCY</span>
                        <div className="card-value-lg">
                            3-4x <span>/ week</span>
                        </div>
                        <div className="card-footer-text">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                            <span>Consistent physical activity</span>
                        </div>
                    </div>

                </div>

                {/* Behavioral Health List Container */}
                <div className="behavioral-list-container">

                    <div className="list-header">
                        <h3>Behavioral Health Metrics</h3>
                        <span className="update-time">Last updated: 2 hours ago</span>
                    </div>

                    <div className="list-items">

                        {/* Smoking Status */}
                        <div className="list-item">
                            <div className="item-left">
                                <div className="item-icon-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M16 16v-2a4 4 0 0 0-4-4H8"></path><path d="M4 16H2v-2h2"></path><path d="M4 10H2V8h2"></path><path d="M4 4H2V2h2"></path><path d="M20 16h-4"></path><path d="M22 6c0-1.65-1.35-3-3-3s-3 1.35-3 3"></path></svg>
                                </div>
                                <div className="item-details">
                                    <h4>Smoking Status</h4>
                                    <p>History and current dependency levels</p>
                                </div>
                            </div>
                            <div className="item-right">
                                <div className="status-badge green-outline">
                                    {summaryData.smokingStatus}
                                </div>
                            </div>
                        </div>

                        {/* Alcohol Consumption */}
                        <div className="list-item">
                            <div className="item-left">
                                <div className="item-icon-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21h14"></path><path d="M12 21v-8"></path><path d="M9 13v-5c0-1.66 1.34-3 3-3s3 1.34 3 3v5"></path><path d="M8.5 7.5L5 4"></path><path d="M15.5 7.5L19 4"></path></svg>
                                </div>
                                <div className="item-details">
                                    <h4>Alcohol Consumption</h4>
                                    <p>Frequency and quantity analysis</p>
                                </div>
                            </div>
                            <div className="item-right">
                                <div className="status-value-group">
                                    <span className="value-bold">{summaryData.alcoholConsumption}</span>
                                    <span className="value-sub">(1-2 units/week)</span>
                                </div>
                            </div>
                        </div>

                        {/* Stress Level */}
                        <div className="list-item">
                            <div className="item-left">
                                <div className="item-icon-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3 8 5-16 3 8h5"></path></svg>
                                </div>
                                <div className="item-details">
                                    <h4>Stress Level</h4>
                                    <p>Cortisol-linked behavioral monitoring</p>
                                </div>
                            </div>
                            <div className="item-right stress-right">
                                {renderStressBars()}
                                <span className="value-bold capitalize">{summaryData.stressLevel}</span>
                            </div>
                        </div>

                        {/* Sleep Duration */}
                        <div className="list-item">
                            <div className="item-left">
                                <div className="item-icon-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                                </div>
                                <div className="item-details">
                                    <h4>Sleep Duration</h4>
                                    <p>Circadian rhythm and REM consistency</p>
                                </div>
                            </div>
                            <div className="item-right">
                                <div className="status-value-group">
                                    <span className="value-bold">{summaryData.sleepDuration}</span>
                                    <span className="value-pill-green">Consistent</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Final Confirm Button Sequence */}
                <div className="submit-sequence">
                    <button className="confirm-btn" onClick={handleConfirm}>
                        CONFIRM & CONTINUE
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                    <p className="submit-disclaimer">By clicking confirm, you acknowledge the accuracy of these metrics for the clinical dashboard.</p>
                </div>

            </main>
        </div>
    );
};
