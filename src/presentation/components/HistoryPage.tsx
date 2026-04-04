// @ts-ignore
import { apiFetch } from '../../api';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css';

export interface AnalysisRecord {
    id: number;
    patient_id: number;
    patient_name: string;
    visit_date: string;
    age: number;
    height_cm: number;
    weight_kg: number;
    occupation: string;
    exercise_frequency: string;
    morphology_percent: number;
    dfi_percent: number;
    morphology_class: string;
    morphology_confidence: number;
    created_at: string;
}

export const HistoryPage: React.FC = () => {
    const navigate = useNavigate();
    const [historyData, setHistoryData] = useState<AnalysisRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedRecord, setSelectedRecord] = useState<AnalysisRecord | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeSearch, setActiveSearch] = useState<string>('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await apiFetch('/history');
                if (!response.ok) {
                    throw new Error('Failed to fetch history data.');
                }
                const result = await response.json();
                if (result.status === 'success' && Array.isArray(result.data)) {
                    setHistoryData(result.data);
                } else {
                    setHistoryData([]);
                }
            } catch (err: any) {
                console.error("API Error:", err);
                setError(err.message || 'An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const handleSignOut = () => {
        localStorage.clear();
        navigate('/login', { replace: true });
    };

    const handleReanalyze = (record: AnalysisRecord) => {
        navigate(`/upload?patient_id=${record.patient_id}&patient_name=${encodeURIComponent(record.patient_name)}`);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setActiveSearch(searchTerm.trim());
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this analysis report? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await apiFetch(`/analysis/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Update local state to remove the deleted record
                setHistoryData(prevData => prevData.filter(record => record.id !== id));
                if (selectedRecord?.id === id) {
                    setSelectedRecord(null);
                }
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete record.');
            }
        } catch (err: any) {
            console.error("Delete Error:", err);
            alert(`Error deleting record: ${err.message}`);
        }
    };

    const filteredHistoryData = historyData.filter(record => {
        const sampleId = `SAM-P-${record.patient_id}`.toLowerCase();
        return sampleId.includes(activeSearch.toLowerCase());
    });

    return (
        <div className="history-layout">
            {/* ... existing header ... */}
            <header className="history-header">
                <div className="header-brand" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
                    <svg className="brand-logo" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 6l3-3M6 18h12M10 18v-4M14 18v-4M8 10l8 8" />
                        <circle cx="10" cy="10" r="4" />
                    </svg>
                    <span>SPERMAI</span>
                </div>
                <nav className="history-header-nav">
                    <a href="/" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }} className="history-nav-link">Dashboard</a>
                    <a href="/history" onClick={(e) => e.preventDefault()} className="history-nav-link active">Analysis History</a>
                    <a href="/" onClick={(e) => e.preventDefault()} className="history-nav-link">Support</a>
                    <button className="btn-signout" onClick={handleSignOut}>Sign Out</button>
                    <div className="history-user-avatar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                </nav>
            </header>

            <main className="history-main">
                <div className="history-content-wrapper">
                    <div className="history-header-area">
                        <div>
                            <h1 className="history-title">Analysis History</h1>
                            <p className="history-subtitle">Review previous clinical analysis reports and insights.</p>
                        </div>

                        <form className="history-search-bar" onSubmit={handleSearch}>
                            <div className="search-input-wrapper">
                                <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search by Sample ID (e.g. SAM-P-12)"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <button type="submit" className="btn-search">Search</button>
                        </form>
                    </div>

                    {loading ? (
                        <div className="history-loading-container">
                            <div className="loading-spinner"></div>
                            <p>SYNCING WITH CORE AI...</p>
                        </div>
                    ) : error ? (
                        <div className="history-error-container">
                            <p className="error-text">{error}</p>
                            <button className="btn-retry" onClick={() => window.location.reload()}>RETRY CONNECTION</button>
                        </div>
                    ) : historyData.length === 0 ? (
                        <div className="history-empty-container">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            <p>No previous analysis reports available.</p>
                        </div>
                    ) : filteredHistoryData.length === 0 ? (
                        <div className="history-empty-container">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                            <p>No analysis records found for "{activeSearch}".</p>
                            <button className="btn-view-details" onClick={() => { setSearchTerm(''); setActiveSearch(''); }}>Clear Search</button>
                        </div>
                    ) : (
                        <div className="history-table-container">
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>Sample ID</th>
                                        <th>Patient Name</th>
                                        <th>Visit Date</th>
                                        <th>Age</th>
                                        <th>Morphology</th>
                                        <th>DFI</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredHistoryData.map((record) => (
                                        <tr key={record.id}>
                                            <td className="fw-700 text-green">SAM-P-{record.patient_id}</td>
                                            <td className="fw-500 text-white">{record.patient_name}</td>
                                            <td>{record.visit_date}</td>
                                            <td>{record.age} yrs</td>
                                            <td>
                                                <div className="value-badge green">{record.morphology_percent}%</div>
                                            </td>
                                            <td>
                                                <div className="value-badge blue">{record.dfi_percent}%</div>
                                            </td>
                                            <td style={{ display: 'flex', gap: '8px' }}>
                                                <button className="btn-view-details" onClick={() => setSelectedRecord(record)}>
                                                    View Details
                                                </button>
                                                <button
                                                    className="btn-delete-item"
                                                    onClick={() => handleDelete(record.id)}
                                                    title="Delete Analysis"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal Overlay for Details */}
            {selectedRecord && (
                <div className="modal-overlay" onClick={() => setSelectedRecord(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Detailed Analysis Report</h2>
                            <button className="btn-close-modal" onClick={() => setSelectedRecord(null)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="details-section">
                                <h3><span className="section-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </span> Patient Information</h3>
                                <div className="details-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">Sample ID</span>
                                        <span className="detail-value text-green fw-700">SAM-P-{selectedRecord.patient_id}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Patient Name</span>
                                        <span className="detail-value text-white">{selectedRecord.patient_name}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Visit Date</span>
                                        <span className="detail-value">{selectedRecord.visit_date}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Age</span>
                                        <span className="detail-value">{selectedRecord.age} yrs</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Height</span>
                                        <span className="detail-value">{selectedRecord.height_cm} cm</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Weight</span>
                                        <span className="detail-value">{selectedRecord.weight_kg} kg</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Occupation</span>
                                        <span className="detail-value truncate" title={selectedRecord.occupation || 'N/A'}>{selectedRecord.occupation || 'N/A'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Exercise Frequency</span>
                                        <span className="detail-value truncate" title={selectedRecord.exercise_frequency || 'N/A'}>{selectedRecord.exercise_frequency || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="details-section">
                                <h3><span className="section-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                                </span> Analysis Report</h3>
                                <div className="details-grid analysis-grid">
                                    <div className="detail-item highlight-box">
                                        <span className="detail-label">Morphology Percentage</span>
                                        <span className="detail-value highlight green">{selectedRecord.morphology_percent}%</span>
                                    </div>
                                    <div className="detail-item highlight-box">
                                        <span className="detail-label">DNA Fragmentation (DFI)</span>
                                        <span className="detail-value highlight blue">{selectedRecord.dfi_percent}%</span>
                                    </div>
                                    <div className="detail-item full-width">
                                        <span className="detail-label">Morphology Class</span>
                                        <span className="detail-value text-white">{selectedRecord.morphology_class ? selectedRecord.morphology_class.replace(/_/g, ' ') : 'N/A'}</span>
                                    </div>
                                    <div className="detail-item full-width">
                                        <span className="detail-label">AI Confidence Level</span>
                                        <div className="confidence-bar-container">
                                            <div className="confidence-bar" style={{ width: `${(selectedRecord.morphology_confidence || 0) * 100}%` }}></div>
                                        </div>
                                        <span className="detail-value" style={{ marginTop: '0.2rem', display: 'block' }}>{((selectedRecord.morphology_confidence || 0) * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="detail-item full-width">
                                        <span className="detail-label">Report Created Time</span>
                                        <span className="detail-value">{selectedRecord.created_at ? new Date(selectedRecord.created_at).toLocaleString() : 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button className="btn-reanalyze" onClick={() => handleReanalyze(selectedRecord)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    <path d="m22 2-7 7" />
                                    <path d="M9 22H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                                </svg>
                                Re-analyze Sample
                            </button>
                            <button className="btn-close-primary" onClick={() => setSelectedRecord(null)}>Close Report</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
