import React from 'react';
import './CtaSection.css';

export const CtaSection: React.FC = () => {
    return (
        <section className="cta-section">
            <div className="cta-content">
                <h2 className="cta-title">Empowering Clinics and Research Centers</h2>
                <p className="cta-description">
                    Integrate our Flask-powered AI engine directly into your existing
                    laboratory workflow for seamless, real-time fertility diagnostics.
                </p>

                <div className="cta-features">
                    <div className="cta-feature-item">
                        <span className="cta-feature-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        Sperm DNA Fragmentation
                    </div>
                    <div className="cta-feature-item">
                        <span className="cta-feature-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        Morphology Analysis
                    </div>
                    <div className="cta-feature-item">
                        <span className="cta-feature-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        Kinematics Tracking
                    </div>
                </div>
            </div>

            <div className="cta-action">
                <button className="btn-white">Request a Demo</button>
            </div>
        </section>
    );
};
