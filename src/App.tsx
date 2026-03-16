import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './presentation/components/LandingPage';
import { LoginPage } from './presentation/components/LoginPage';
import { SignUpPage } from './presentation/components/SignUpPage';
import { ForgotPasswordPage } from './presentation/components/ForgotPasswordPage';
import { ResetPasswordPage } from './presentation/components/ResetPasswordPage';
import { Dashboard } from './presentation/components/Dashboard';
import { PolicyDashboard } from './presentation/components/PolicyDashboard';
import { InformedConsent } from './presentation/components/InformedConsent';
import { PatientIntake } from './presentation/components/PatientIntake';
import { HealthAssessment } from './presentation/components/HealthAssessment';
import { HormonalAssessment } from './presentation/components/HormonalAssessment';
import { MetabolicInquiry } from './presentation/components/MetabolicInquiry';
import { StressLevelAssessment } from './presentation/components/StressLevelAssessment';
import { SleepMetrics } from './presentation/components/SleepMetrics';
import { LifestyleSummary } from './presentation/components/LifestyleSummary';
import { UploadSample } from './presentation/components/UploadSample';
import { AnalysisDashboard } from './presentation/components/AnalysisDashboard';
import { HistoryPage } from './presentation/components/HistoryPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-main-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/policy" element={<PolicyDashboard />} />
          <Route path="/consent" element={<InformedConsent />} />
          <Route path="/intake" element={<PatientIntake />} />
          <Route path="/assessment" element={<HealthAssessment />} />
          <Route path="/hormonal-assessment" element={<HormonalAssessment />} />
          <Route path="/metabolic-inquiry" element={<MetabolicInquiry />} />
          <Route path="/stress-assessment" element={<StressLevelAssessment />} />
          <Route path="/sleep-metrics" element={<SleepMetrics />} />
          <Route path="/lifestyle-summary" element={<LifestyleSummary />} />
          <Route path="/upload" element={<UploadSample />} />
          <Route path="/analysis-dashboard" element={<AnalysisDashboard />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
