import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './UploadSample.css';

export const UploadSample: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    // Patient info states
    const [patientId, setPatientId] = useState<string | null>(null);
    const [patientName, setPatientName] = useState<string | null>(null);
    const [isReanalyzing, setIsReanalyzing] = useState(false);
    const [hasStoredInfo, setHasStoredInfo] = useState(false);

    // Form state for patient details
    const [formData, setFormData] = useState({
        patientFullName: '',
        age: '',
        height: '',
        weight: '',
        occupation: '',
        exerciseFrequency: '',
        visitDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        const pId = searchParams.get('patient_id');
        const pName = searchParams.get('patient_name');

        // Check if we already have patient info from the intake flow
        const storedName = localStorage.getItem('spermAI_userName');
        if (storedName) {
            setHasStoredInfo(true);
            setPatientName(storedName);
        }

        if (pId) {
            setPatientId(pId);
            setIsReanalyzing(true);
            if (pName) {
                setPatientName(pName);
                setFormData(prev => ({ ...prev, patientFullName: pName }));
            }
        }
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            setSelectedFiles(prev => [...prev, ...files]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setSelectedFiles(prev => [...prev, ...files]);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Integrated Backend Upload Logic
    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert("Please select or drop files to upload first.");
            return;
        }

        const formDataPayload = new FormData();
        selectedFiles.forEach((file) => {
            formDataPayload.append('images', file);
        });

        // Use patient_id from URL if re-analyzing, otherwise check form or localstorage
        if (patientId) {
            formDataPayload.append('patient_id', patientId);
        } else {
            // Append patient details if it's a new patient
            formDataPayload.append('patient_name', formData.patientFullName);
            formDataPayload.append('age', formData.age);
            formDataPayload.append('height_cm', formData.height);
            formDataPayload.append('weight_kg', formData.weight);
            formDataPayload.append('occupation', formData.occupation);
            formDataPayload.append('exercise_frequency', formData.exerciseFrequency);
            formDataPayload.append('visit_date', formData.visitDate);
        }

        try {
            const response = await fetch('http://localhost:8000/api/upload-sample', {
                method: 'POST',
                body: formDataPayload,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to upload sample');
            }

            // Extract analysis results from Flask response
            const analysisId = data.analysis?.id;
            const patientData = data.patient;
            const analysisData = data.analysis;

            alert(`Analysis Initialized! Successfully uploaded ${selectedFiles.length} file(s).`);
            console.log("Upload & Analysis Success:", data);

            // Navigate to the diagnostic viewport and pass the backend results
            // We pass the whole 'data' object which contains 'result' (or 'analysis' in Flask)
            navigate('/analysis-dashboard', {
                state: {
                    data: {
                        patient: { patient_name: patientData?.patient_name },
                        result: {
                            morphology_percent: analysisData?.morphology_percent,
                            dfi_percent: analysisData?.dfi_percent
                        }
                    },
                    analysisId
                }
            });

        } catch (error: any) {
            console.error('Upload error:', error);
            alert(`Upload failed: ${error.message}`);
        }
    };

    return (
        <div className="upload-layout">

            {/* Minimal Header */}
            <header className="upload-header">
                <div className="brand">
                    <div className="brand-logo">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                    </div>
                    <div className="brand-titles">
                        <h2>SPERMAI</h2>

                    </div>
                </div>

                <div className="header-status-bar">
                    <div className="system-online-badge">
                        <div className="status-dot"></div>
                        <span>SYSTEM ONLINE</span>
                    </div>

                    <button className="icon-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    </button>

                    <div className="user-avatar">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CommanderRex" alt="User" />
                    </div>
                </div>
            </header>

            <main className="upload-main">

                {/* Title Area */}
                <div className="upload-title-box">
                    <div className="status-label">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                        <span>{isReanalyzing ? 'RE-ANALYSIS SEQUENCE' : 'AWAITING INPUT SEQUENCE'}</span>
                    </div>
                    <h1>
                        {isReanalyzing ? (
                            <>Re-analyzing sample for: <span>{patientName}</span></>
                        ) : hasStoredInfo ? (
                            <>Upload Sample for: <span>{patientName}</span></>
                        ) : (
                            <>Mission-Critical <span>Upload</span></>
                        )}
                    </h1>
                    <p>Secure diagnostic portal for high-resolution microscopic imaging and biometric data synthesis. Ensure samples meet Grade-A preparation protocols.</p>
                </div>

                {/* Patient Details Form - Hidden if re-analyzing OR if we already have info from intake */}
                {!isReanalyzing && !hasStoredInfo && (
                    <div className="patient-details-form">
                        <div className="form-section-title">
                            <h3><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Patient Identification</h3>
                        </div>
                        <div className="upload-form-grid">
                            <div className="upload-form-group full-width">
                                <label>PATIENT FULL NAME</label>
                                <input
                                    type="text"
                                    name="patientFullName"
                                    placeholder="e.g. Johnathan Doe"
                                    value={formData.patientFullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="upload-form-group">
                                <label>AGE</label>
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="34"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="upload-form-group">
                                <label>VISIT DATE</label>
                                <input
                                    type="date"
                                    name="visitDate"
                                    value={formData.visitDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="upload-form-group">
                                <label>HEIGHT (CM)</label>
                                <input
                                    type="number"
                                    name="height"
                                    placeholder="180"
                                    value={formData.height}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="upload-form-group">
                                <label>WEIGHT (KG)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    placeholder="75"
                                    value={formData.weight}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="upload-form-group full-width">
                                <label>OCCUPATION</label>
                                <input
                                    type="text"
                                    name="occupation"
                                    placeholder="Software Engineer"
                                    value={formData.occupation}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="upload-form-group full-width">
                                <label>EXERCISE FREQUENCY</label>
                                <select
                                    name="exerciseFrequency"
                                    value={formData.exerciseFrequency}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="" disabled hidden>Select frequency</option>
                                    <option value="none">None</option>
                                    <option value="light">Light (1-2 days/week)</option>
                                    <option value="moderate">Moderate (3-4 days/week)</option>
                                    <option value="active">Active (5+ days/week)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Drag and Drop Zone */}
                <div
                    className={`drag-drop-zone ${isDragging ? 'drag-active' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileSelect}
                        multiple
                        accept=".dcm,.nii,.jpg,.png,.jpeg,.bmp"
                    />

                    <div className="upload-icon-container">
                        <div className="upload-glow"></div>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                    </div>

                    <h2>{selectedFiles.length > 0 ? `${selectedFiles.length} File(s) Selected` : 'Upload Your Sample'}</h2>
                    <p>Drag and drop raw microscopy files or click to initiate encrypted transmission. Supports DICOM, NIfTI, BMP, and high-res JPEG.</p>

                    <button className="btn-select-files" onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}>
                        Select Source Files
                    </button>

                    <div className="security-badges">
                        <span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#1fcb70" stroke="#1fcb70" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            ENCRYPTED
                        </span>
                        <span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            VERIFIED
                        </span>
                        <span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            ULTRA-FAST
                        </span>
                    </div>
                </div>

                {/* Configuration Card */}
                <div className="config-card">
                    <div className="card-left">
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1fcb70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </div>
                        <div className="card-info">
                            <h3>Microscopic Images</h3>
                            <p>Optimized for static cell analysis, tissue pathology, and high-contrast bacterial mapping.</p>
                            <button className="link-configure" onClick={handleUpload}>
                                CONFIGURE IMAGING
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                    <div className="card-right">
                        <span className="badge-high-res">HIGH RES</span>
                    </div>
                </div>

                {/* Warning Banner */}
                <div className="warning-banner">
                    <div className="warning-content">
                        <div className="warning-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fcb436" stroke="#fcb436" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        </div>
                        <div className="warning-text">
                            <h4>CRITICAL NOTICE: SAMPLE PREPARATION PROTOCOL</h4>
                            <p>All biological samples must be stained with Elite-Grade reagents prior to scanning. Low-contrast inputs may result in sub-optimal AI synthesis. Ensure lens calibration is set to 400x magnification or higher for accurate diagnostic results.</p>
                        </div>
                    </div>
                    <div className="warning-bg-icon">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer className="micro-footer">
                <div className="footer-links">
                    <a href="#docs">PROTOCOL DOCS</a>
                    <a href="#audit">SECURITY AUDIT</a>
                    <a href="#status">SYSTEM STATUS</a>
                </div>
                <div className="footer-copyright">
                    © 2024 MEDICAL AI COMMAND, PROPRIETARY ACCESS ONLY.
                </div>
            </footer>

        </div>
    );
};
