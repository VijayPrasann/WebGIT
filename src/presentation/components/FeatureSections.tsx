import React from 'react';
import './FeatureSections.css';

const features = [
    {
        title: 'Accurate Analysis',
        description: 'Deep learning models trained on extensive medical datasets to ensure clinical-grade precision in every assessment.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
        )
    },
    {
        title: 'Explainable Results',
        description: 'Understand every aspect of your analysis with detailed insights. We break down complex data into actionable information.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
        )
    },
    {
        title: 'Secure & Private',
        description: 'Your medical data is encrypted with state-of-the-art protocols. We prioritize patient confidentiality and HIPAA compliance.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
        )
    }
];

export const FeatureSections: React.FC = () => {
    return (
        <section className="features-container">
            {features.map((feature, index) => (
                <div key={index} className="feature-card">
                    <div className="feature-icon-wrapper">
                        {feature.icon}
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                </div>
            ))}
        </section>
    );
};
