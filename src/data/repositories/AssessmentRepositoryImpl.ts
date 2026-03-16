import type { AssessmentRepository } from '../../domain/repositories/AssessmentRepository';
import type { AssessmentResult } from '../../domain/models/Assessment';

export class AssessmentRepositoryImpl implements AssessmentRepository {

    async getLatestAssessment(): Promise<AssessmentResult> {
        // In a real app, this hits the API:
        // return apiClient.get<AssessmentResult>('/assessments/latest');

        // For demo purposes and design matching without a real backend:
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: '123',
                    status: 'COMPLETED',
                    createdAt: new Date().toISOString(),
                    features: [
                        {
                            title: 'Accurate Analysis',
                            description: 'Deep learning models trained on extensive medical datasets'
                        },
                        {
                            title: 'Explainable Results',
                            description: 'Understand every aspect of your analysis with detailed insights'
                        }
                    ]
                });
            }, 500);
        });
    }

    async startAnalysis(): Promise<void> {
        // In a real app:
        // await apiClient.post('/assessments/start');

        return new Promise((resolve) => setTimeout(resolve, 800));
    }
}

// Export a singleton instance
export const assessmentRepository = new AssessmentRepositoryImpl();
