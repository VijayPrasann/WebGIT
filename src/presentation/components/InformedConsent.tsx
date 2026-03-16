import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InformedConsent.css';

export const InformedConsent: React.FC = () => {
    const navigate = useNavigate();

    // State for the four toggles
    const [toggles, setToggles] = useState({
        dataUsage: false,
        researchPurpose: false,
        medicalDisclaimer: false,
        aiEthics: false
    });

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Require all toggles to be true to proceed (optional, but good practice here)
    // For now we'll just allow it to be clickable anyway matching standard UI,
    // or you could disable the button if not all are checked.
    const allChecked = Object.values(toggles).every(Boolean);

    const handleProceed = () => {
        // You can add validation here if needed:
        // if (!allChecked) return;

        // Navigate to the next step (e.g., patient details or sample upload)
        // Adjust this route based on your application flow
        console.log("Consent confirmed, advancing...");
        navigate('/intake');
    };

    return (
        <div className="consent-layout">
            <div className="consent-card">

                <div className="consent-header">
                    <div className="consent-icon-wrapper">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </div>

                    <h1 className="consent-title">Informed Consent</h1>
                    <p className="consent-subtitle">
                        As a high-tier fertility professional, your trust and data security are our priority.
                        Please review and authorize the following protocols for AI analysis.
                    </p>
                </div>

                <div className="consent-grid">

                    {/* Data Usage Policy */}
                    <div className={`consent-item ${toggles.dataUsage ? 'active' : ''}`}>
                        <div className="item-header">
                            <div className="item-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                                </svg>
                            </div>
                            <button
                                className={`toggle-switch ${toggles.dataUsage ? 'on' : 'off'}`}
                                onClick={() => handleToggle('dataUsage')}
                            >
                                <span className="toggle-slider"></span>
                            </button>
                        </div>
                        <div className="item-body">
                            <h3>Data Usage Policy</h3>
                            <p>Enterprise-grade encryption for all processed fertility datasets. Data is anonymized and handled per HIPAA compliance.</p>
                            <button className="btn-review">REVIEW DOCUMENT ↗</button>
                        </div>
                    </div>

                    {/* Research Purpose */}
                    <div className={`consent-item ${toggles.researchPurpose ? 'active' : ''}`}>
                        <div className="item-header">
                            <div className="item-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 3H15M10 3V12L5 20H19L14 12V3" fill="none" />
                                </svg>
                            </div>
                            <button
                                className={`toggle-switch ${toggles.researchPurpose ? 'on' : 'off'}`}
                                onClick={() => handleToggle('researchPurpose')}
                            >
                                <span className="toggle-slider"></span>
                            </button>
                        </div>
                        <div className="item-body">
                            <h3>Research Purpose</h3>
                            <p>I acknowledge that the AI insights provided are intended to augment medical research and clinical decision support.</p>
                        </div>
                    </div>

                    {/* Medical Disclaimer */}
                    <div className={`consent-item ${toggles.medicalDisclaimer ? 'active' : ''}`}>
                        <div className="item-header">
                            <div className="item-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </div>
                            <button
                                className={`toggle-switch ${toggles.medicalDisclaimer ? 'on' : 'off'}`}
                                onClick={() => handleToggle('medicalDisclaimer')}
                            >
                                <span className="toggle-slider"></span>
                            </button>
                        </div>
                        <div className="item-body">
                            <h3>Medical Disclaimer</h3>
                            <p>I understand that AI outputs are not a substitute for professional medical judgment or direct clinical observation.</p>
                        </div>
                    </div>

                    {/* AI Ethics & Transparency */}
                    <div className={`consent-item ${toggles.aiEthics ? 'active' : ''}`}>
                        <div className="item-header">
                            <div className="item-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 16v-4"></path>
                                    <path d="M12 8h.01"></path>
                                </svg>
                            </div>
                            <button
                                className={`toggle-switch ${toggles.aiEthics ? 'on' : 'off'}`}
                                onClick={() => handleToggle('aiEthics')}
                            >
                                <span className="toggle-slider"></span>
                            </button>
                        </div>
                        <div className="item-body">
                            <h3>AI Ethics & Transparency</h3>
                            <p>Consent to the use of generative models and neural networks in accordance with the AI Ethics Framework for Fertility.</p>
                        </div>
                    </div>

                </div>

                <div className="consent-footer">
                    <button className="btn-cancel" onClick={() => navigate(-1)}>
                        Cancel & Back
                    </button>

                    <button
                        className={`btn-agree ${allChecked ? 'ready' : ''}`}
                        onClick={handleProceed}
                    >
                        I AGREE & PROCEED »
                    </button>
                </div>
            </div>

            <div className="pager-dots">
                <span className="dot"></span>
                <span className="dot active-pill"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    );
};
