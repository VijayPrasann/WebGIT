// @ts-ignore
import { apiFetch } from '../../api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientIntake.css';

export const PatientIntake: React.FC = () => {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        patientFullName: '',
        visitDate: '',
        age: '',
        height: '',
        weight: '',
        occupation: '',
        exerciseFrequency: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContinue = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await apiFetch('/patient-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patient_name: formData.patientFullName,
                    visit_date: formData.visitDate,
                    age: formData.age,
                    height_cm: formData.height,
                    weight_kg: formData.weight,
                    occupation: formData.occupation,
                    exercise_frequency: formData.exerciseFrequency
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Failed to save patient details');
            }

            console.log('Patient Details Saved:', data);

            // Save user name and biometrics to local storage for final Bio Report dashboard map
            localStorage.setItem('spermAI_userName', formData.patientFullName || 'Commander Unknown');
            if (formData.age) localStorage.setItem('spermAI_userAge', formData.age);
            if (formData.height) localStorage.setItem('spermAI_userHeight', formData.height);
            if (formData.weight) localStorage.setItem('spermAI_userWeight', formData.weight);

            // Navigate to the next step, passing the patient ID from the response if needed
            navigate('/assessment', { state: { patientId: data?.data?.id || formData.patientFullName } });

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="intake-layout">

            {/* Top Navigation */}
            <header className="intake-header">
                <div className="header-brand">
                    <svg className="brand-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="12" y1="18" x2="12" y2="12"></line>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                    <span>SPERM<span className="brand-light">AI</span></span>
                </div>

                <div className="header-actions">
                    <button className="icon-button notification-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                    </button>
                    <button className="icon-button profile-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="intake-main">

                <div className="intake-titles">
                    <h1 className="page-title">Patient Intake</h1>
                    <p className="page-subtitle">Command Center - Data Entry Protocol v2.4</p>
                </div>

                <div className="intake-card">
                    <form onSubmit={handleContinue}>

                        {/* Patient Full Name */}
                        <div className="form-group full-width">
                            <label>PATIENT FULL NAME</label>
                            <div className="input-with-icon">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    name="patientFullName"
                                    placeholder="Johnathan Doe"
                                    value={formData.patientFullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Visit Date & Age */}
                        <div className="form-row">
                            <div className="form-group half-width">
                                <label>VISIT DATE</label>
                                <div className="input-with-icon date-input-wrapper">
                                    <span className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                    </span>
                                    <input
                                        type="date"
                                        name="visitDate"
                                        className="date-input"
                                        placeholder="mm/dd/yyyy"
                                        value={formData.visitDate}
                                        onChange={handleChange}
                                        required
                                    />
                                    {/* Default HTML5 date inputs have their own calendar icon we may need to hide or override, styling handles this */}
                                </div>
                            </div>

                            <div className="form-group half-width">
                                <label>AGE</label>
                                <div className="input-with-icon">
                                    <span className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="5" r="3"></circle>
                                            <line x1="12" y1="22" x2="12" y2="8"></line>
                                            <path d="M5 11l7-3 7 3"></path>
                                        </svg>
                                    </span>
                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="e.g. 34"
                                        min="1"
                                        max="120"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Height & Weight */}
                        <div className="form-row">
                            <div className="form-group half-width">
                                <label>HEIGHT (CM)</label>
                                <div className="input-with-icon">
                                    <span className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="10" width="18" height="4" rx="1" ry="1"></rect>
                                            <line x1="7" y1="10" x2="7" y2="14"></line>
                                            <line x1="12" y1="10" x2="12" y2="14"></line>
                                            <line x1="17" y1="10" x2="17" y2="14"></line>
                                        </svg>
                                    </span>
                                    <input
                                        type="number"
                                        name="height"
                                        placeholder="180"
                                        value={formData.height}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group half-width">
                                <label>WEIGHT (KG)</label>
                                <div className="input-with-icon">
                                    <span className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="4" y="5" width="16" height="16" rx="2" ry="2"></rect>
                                            <circle cx="12" cy="13" r="3"></circle>
                                        </svg>
                                    </span>
                                    <input
                                        type="number"
                                        name="weight"
                                        placeholder="75"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Occupation */}
                        <div className="form-group full-width">
                            <label>OCCUPATION</label>
                            <div className="input-with-icon">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    name="occupation"
                                    placeholder="Software Engineer"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Exercise Frequency */}
                        <div className="form-group full-width">
                            <label>EXERCISE FREQUENCY</label>
                            <div className="input-with-icon select-wrapper">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18.8 8.4l-.4.4"></path>
                                        <path d="M13.4 13.8l-1.4 1.4"></path>
                                        <path d="M5.6 21.6l-1.4-1.4"></path>
                                        <path d="M7 20.2l1.4-1.4"></path>
                                        <path d="M2.4 17l1.4-1.4"></path>
                                        <path d="M4 17V3h14l-1.4 1.4"></path>
                                        <path d="M21 7l-1.4-1.4"></path>
                                        <path d="M15.6 11.6l1.4-1.4"></path>
                                        <path d="M17 10.2l-1.4-1.4"></path>
                                        <path d="M22 6.4L17.6 2l-1.4 1.4 4.4 4.4zM4.4 19.6L0 15.2l1.4-1.4 4.4 4.4z"></path>
                                    </svg>
                                </span>
                                <select
                                    name="exerciseFrequency"
                                    className="custom-select"
                                    value={formData.exerciseFrequency}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled hidden>Select frequency</option>
                                    <option value="none">None</option>
                                    <option value="light">Light (1-2 days/week)</option>
                                    <option value="moderate">Moderate (3-4 days/week)</option>
                                    <option value="active">Active (5+ days/week)</option>
                                </select>
                                <span className="select-chevron">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && <div className="error-message" style={{ color: '#ff4d4f', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

                        {/* Action Button */}
                        <div className="action-row">
                            <button type="submit" className="btn-continue" disabled={loading}>
                                {loading ? 'Saving securely...' : 'Continue to Analysis'}
                                {!loading && (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="security-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        <polyline points="9 12 12 15 15 9"></polyline>
                    </svg>
                    SECURE & CONFIDENTIAL MEDICAL DATA COLLECTION
                    <span className="pulsing-dots">
                        <span className="p-dot"></span>
                        <span className="p-dot"></span>
                    </span>
                </div>
            </main>

            {/* Bottom Left System Information */}
            <div className="system-status-indicator">
                <div className="progress-bar-container">
                    <div className="progress-bar-track">
                        <div className="progress-bar-fill" style={{ width: '40%' }}></div>
                    </div>
                </div>
                <div className="status-text">
                    SYSTEM STATUS: OPTIMAL // ENCRYPTED_CHANNEL: ACTIVE
                </div>
            </div>

        </div>
    );
};
