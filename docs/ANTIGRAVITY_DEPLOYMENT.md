## Antigravity Deployment Guide: AI Fertility Analysis Web Frontend

This frontend conforms to the Antigravity clean architecture implementation standards, ensuring high parity with backend/Android implementations.

### Implementation Checklist
1. **API Parity**: `src/data/api/ApiClient.ts` uses the standard REST structure mimicking the Android networking setup.
2. **State Management**: `src/presentation/viewmodels/useHomeViewModel.ts` and `src/presentation/viewmodels/useAnalysisViewModel.ts` ensure component logic acts independently as an Android ViewModel.
3. **Data/Domain Separation**: Models and Respositories interface contracts belong to the `domain` layer and the implementation belongs to the `data` layer (e.g. `AssessmentRepositoryImpl`).

### Deployment Instructions
1. This application uses Vite. Run `npm run build` to output static assets to the `dist` directory.
2. Ensure environment variables are set in your CI/CD pipeline (e.g., `VITE_API_BASE_URL`).
3. Deploy the contents of the `dist` directory to your static hosting provider (e.g. Google Cloud Storage, Firebase Hosting).

### Future Considerations
When scaling this module further:
- Implement Redux Toolkit if application state complexity increases beyond what Context/Custom Hooks handle comfortably without prop drilling.
- Expand API interceptors for robust auth token management equivalent to Android's OkHttp interceptors.
