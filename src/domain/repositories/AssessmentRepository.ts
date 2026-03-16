import type { AssessmentResult } from '../models/Assessment';

export interface AssessmentRepository {
    /**
     * Fetches the latest fertility assessment results.
     */
    getLatestAssessment(): Promise<AssessmentResult>;

    /**
     * Starts a new analysis process.
     */
    startAnalysis(): Promise<void>;
}
