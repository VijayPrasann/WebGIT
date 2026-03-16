import { useState, useCallback, useEffect } from 'react';
import type { AssessmentResult } from '../../domain/models/Assessment';
import { assessmentRepository } from '../../data/repositories/AssessmentRepositoryImpl';

interface AnalysisState {
    isLoading: boolean;
    error: string | null;
    assessment: AssessmentResult | null;
}

export const useAnalysisViewModel = () => {
    const [state, setState] = useState<AnalysisState>({
        isLoading: true,
        error: null,
        assessment: null,
    });

    const loadAssessment = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const data = await assessmentRepository.getLatestAssessment();
            setState({
                isLoading: false,
                error: null,
                assessment: data,
            });
        } catch (err) {
            console.error(err);
            setState({
                isLoading: false,
                error: 'Failed to load assessment data.',
                assessment: null,
            });
        }
    }, []);

    const startNewAnalysis = async () => {
        try {
            await assessmentRepository.startAnalysis();
            // Assuming after starting analysis we'd want to refresh or navigate
            // Here we just refresh
            await loadAssessment();
        } catch (error) {
            // Error handling here
            console.error(error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            void loadAssessment();
        }, 0);
        return () => clearTimeout(timer);
    }, [loadAssessment]);

    return {
        ...state,
        startNewAnalysis,
        retry: loadAssessment,
    };
};
