import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export const Hero: React.FC = () => {
    return (
        <section className="hero-container">
            <div className="hero-content">
                <div className="hero-badge">
                    <div className="hero-badge-dot"></div>
                    AI-POWERED PRECISION
                </div>

                <h1 className="hero-title">
                    Advanced AI<br />
                    <span className="text-green">Fertility Analysis</span>
                </h1>

                <p className="hero-description">
                    Our advanced AI system analyzes microscopic images and videos to provide comprehensive fertility risk assessments and sperm DNA fragmentation analysis.
                </p>

                <div className="hero-actions">
                    <Link to="/login" className="btn-primary">
                        Get Started
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <button className="btn-secondary">View Sample Report</button>
                </div>
            </div>

            <div className="hero-graphic">
                <div className="floating-element top-right">
                    <div className="floating-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                    </div>
                    Vitals State
                </div>

                <div className="graphic-card">
                    <div className="graphic-circle">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="graphic-icon">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </div>
                    <div className="graphic-progress">
                        <div className="graphic-progress-bar"></div>
                    </div>
                    <div className="graphic-text">SCANNING DNA MATRIX</div>
                </div>

                <div className="floating-element bottom-left">
                    <div className="floating-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                    </div>
                    DNA Integrity
                </div>
            </div>
        </section>
    );
};
