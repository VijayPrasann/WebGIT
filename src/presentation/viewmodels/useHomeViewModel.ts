import { useState, useCallback, useEffect } from 'react';
import type { AssessmentResult } from '../../domain/models/Assessment';
import { assessmentRepository } from '../../data/repositories/AssessmentRepositoryImpl';

interface HomeViewState {
    isLoading: boolean;
    error: string | null;
    assessment: AssessmentResult | null;
}

export function useHomeViewModel() {
    const [state, setState] = useState<HomeViewState>({
        isLoading: false,
        error: null,
        assessment: null,
    });

    const loadAssessment = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const result = await assessmentRepository.getLatestAssessment();
            setState({ isLoading: false, error: null, assessment: result });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An error occurred';
            setState({ isLoading: false, error: message, assessment: null });
        }
    }, []);

    const onContinueClicked = useCallback(async () => {
        // Android App logic typically calls startAnalysis or navigates
        try {
            await assessmentRepository.startAnalysis();
            // Handle navigation or state updates here after successful call
            console.log("Analysis started!");
        } catch (err) {
            console.error("Failed to start analysis", err);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            void loadAssessment();
        }, 0);
        return () => clearTimeout(timer);
    }, [loadAssessment]);

    return {
        state,
        onContinueClicked,
        refreshAssessment: loadAssessment
    };
}
