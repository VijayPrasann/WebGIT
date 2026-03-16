export interface AssessmentFeature {
  title: string;
  description: string;
}

export interface AssessmentResult {
  id: string;
  status: 'PENDING' | 'COMPLETED' | 'ERROR';
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  features: AssessmentFeature[];
  createdAt: string;
}
