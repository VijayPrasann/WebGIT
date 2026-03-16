import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header: React.FC = () => {
    return (
        <header className="header-container">
            <div className="header-logo">
                <div className="logo-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor" />
                        <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1 13h-2v-2h2v2zm0-4h-2V7h2v6z" fill="white" />
                    </svg>
                </div>
                FertilityAI
            </div>

            <nav className="header-nav">
                <a href="#technology">Technology</a>
                <a href="#research">Research</a>
                <a href="#security">Security</a>
                <a href="#contact">Contact</a>
            </nav>

            <div className="header-actions">
                <button className="btn-icon" aria-label="Toggle Dark Mode">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>
                <Link to="/login" className="btn-login">Log In</Link>
            </div>
        </header>
    );
};
