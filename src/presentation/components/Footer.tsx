import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
    return (
        <footer className="footer-container">
            <div className="footer-top">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <div className="footer-logo-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor" />
                                <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1 13h-2v-2h2v2zm0-4h-2V7h2v6z" fill="white" />
                            </svg>
                        </div>
                        FertilityAI
                    </div>
                    <p className="footer-description">
                        Revolutionizing reproductive health through clinical-grade artificial intelligence and microscopic analysis.
                    </p>
                </div>

                <div className="footer-links-group">
                    <h4 className="footer-links-title">Product</h4>
                    <div className="footer-links">
                        <a href="#analysis">Analysis Tools</a>
                        <a href="#api">API Reference</a>
                        <a href="#cases">Case Studies</a>
                    </div>
                </div>

                <div className="footer-links-group">
                    <h4 className="footer-links-title">Legal</h4>
                    <div className="footer-links">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                        <a href="#hipaa">HIPAA Compliance</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} FertilityAI Diagnostics. All rights reserved.
            </div>
        </footer>
    );
};
