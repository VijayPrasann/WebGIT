import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useAnalysisViewModel } from '../viewmodels/useAnalysisViewModel';
import './AIAnalysisScreen.css';

const ChevronRightIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="btn-icon-right"
    >
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

const MotherChildPlaceholder = () => (
    <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <svg viewBox="0 0 100 100" fill="none" width="80%" height="80%">
            {/* Simple stylized placeholder for the image to mimic shape */}
            <path d="M50 10 C30 10 15 25 10 45 C10 65 25 80 40 85 C45 88 55 88 60 85 C75 80 90 65 90 45 C85 25 70 10 50 10 Z" fill="#9C27B0" opacity="0.1" />
            <path d="M50 20 C65 25 75 40 60 60 C50 75 40 70 30 55 C20 40 30 25 50 20" stroke="#9C27B0" strokeWidth="3" fill="none" />
            <circle cx="50" cy="35" r="8" fill="#9C27B0" />
            <circle cx="35" cy="50" r="5" fill="#9C27B0" />
        </svg>
    </div>
);

export const AIAnalysisScreen: React.FC = () => {
    const { isLoading, error, assessment } = useAnalysisViewModel();

    if (isLoading) {
        return (
            <div className="analysis-screen">
                <div className="analysis-header" style={{ flex: 1, justifyContent: 'center' }}>
                    <p>Loading AI Analysis Data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="analysis-screen">
                <div className="analysis-header" style={{ flex: 1, justifyContent: 'center', color: '#D32F2F' }}>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="analysis-screen">
            <div className="analysis-header">
                <div className="image-container">
                    <div className="image-inner">
                        <MotherChildPlaceholder />
                    </div>
                </div>

                <h1 className="analysis-title">AI Fertility Analysis</h1>
                <p className="analysis-subtitle">
                    Our advanced AI system analyzes microscopic images and videos to provide comprehensive fertility risk assessments and sperm DNA fragmentation analysis.
                </p>
            </div>

            <div className="analysis-features">
                {assessment?.features?.map((feature, index) => (
                    <div key={index}>
                        <Card title={feature.title} description={feature.description} />
                    </div>
                ))}
                {/* Fallback if no dynamic features loaded but UI still renders */}
                {(!assessment || !assessment.features || assessment.features.length === 0) && (
                    <>
                        <Card
                            title="Accurate Analysis"
                            description="Deep learning models trained on extensive medical datasets"
                        />
                        <Card
                            title="Explainable Results"
                            description="Understand every aspect of your analysis with detailed insights"
                        />
                    </>
                )}
            </div>

            <div className="analysis-actions">
                <Button onClick={() => console.log("Continue clicked")}>
                    Continue <ChevronRightIcon />
                </Button>
            </div>
        </div>
    );
};
