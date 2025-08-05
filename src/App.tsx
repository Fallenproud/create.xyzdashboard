import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { CollaborationProvider } from './context/CollaborationContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy loaded components
const Dashboard = lazy(() => import('./components/pages/Dashboard'));
const PricingPage = lazy(() => import('./components/pages/PricingPage'));
const DocsPage = lazy(() => import('./components/pages/DocsPage'));
const BuildPage = lazy(() => import('./components/pages/BuildPage'));
const NewProjectPage = lazy(() => import('./components/pages/NewProjectPage'));
const ProjectPage = lazy(() => import('./components/pages/ProjectPage'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-800"></div>
  </div>
);

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <LoadingFallback />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProjectProvider>
          <CollaborationProvider>
            <Router>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<LoginPage />} />
                  
                  {/* Protected routes */}
                  <Route
                    path="/dashboard/*"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pricing"
                    element={
                      <ProtectedRoute>
                        <PricingPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/docs/*"
                    element={
                      <ProtectedRoute>
                        <DocsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/build"
                    element={
                      <ProtectedRoute>
                        <BuildPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/build/new"
                    element={
                      <ProtectedRoute>
                        <NewProjectPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/build/:projectId/*"
                    element={
                      <ProtectedRoute>
                        <ProjectPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </Router>
          </CollaborationProvider>
        </ProjectProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
