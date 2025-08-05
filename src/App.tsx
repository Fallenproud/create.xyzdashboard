import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';

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
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<LoginPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/docs/:section" element={<DocsPage />} />
              
              {/* Protected routes */}
              <Route path="/dashboard/*" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* Build routes */}
              <Route path="/build" element={
                <ProtectedRoute>
                  <BuildPage />
                </ProtectedRoute>
              } />
              
              <Route path="/build/new" element={
                <ProtectedRoute>
                  <NewProjectPage />
                </ProtectedRoute>
              } />
              
              <Route path="/build/:projectId/*" element={
                <ProtectedRoute>
                  <ProjectPage />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
