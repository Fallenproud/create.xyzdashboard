import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Header from '../layout/Header';
import Breadcrumbs from '../ui/Breadcrumbs';
import { useProjects } from '../../context/ProjectContext';
import ChatInterface from '../features/ChatInterface';

// Lazy loaded components
const ProjectOverview = lazy(() => import('../features/project/ProjectOverview'));
const ProjectFiles = lazy(() => import('../features/project/ProjectFiles'));
const ProjectSettings = lazy(() => import('../features/project/ProjectSettings'));
const ProjectAI = lazy(() => import('../features/project/ProjectAI'));

// Loading component
const ComponentLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-800"></div>
  </div>
);

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectById } = useProjects();
  const location = useLocation();
  const [project, setProject] = useState(projectId ? getProjectById(projectId) : undefined);
  
  // Refresh project data when projectId changes
  useEffect(() => {
    if (projectId) {
      const projectData = getProjectById(projectId);
      setProject(projectData);
    }
  }, [projectId, getProjectById]);
  
  // If project doesn't exist, redirect to build page
  if (!project) {
    return <Navigate to="/build" replace />;
  }
  
  // Determine active tab
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/files')) return 'files';
    if (path.includes('/settings')) return 'settings';
    if (path.includes('/ai')) return 'ai';
    return 'overview';
  };
  
  const activeTab = getActiveTab();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow pt-[46px] bg-zinc-50">
        <div className="border-b bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Breadcrumbs />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-2">
              <h1 className="text-2xl font-semibold">{project.name}</h1>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.status === 'active' ? 'bg-green-100 text-green-800' :
                  project.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-zinc-100 text-zinc-800'
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
                <span className="text-xs text-zinc-500">
                  Updated {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="flex mt-6 border-b overflow-x-auto">
              <Link 
                to={`/build/${projectId}`}
                className={`px-4 py-2 border-b-2 whitespace-nowrap ${
                  activeTab === 'overview' 
                    ? 'border-zinc-800 text-zinc-800 font-medium' 
                    : 'border-transparent text-zinc-600 hover:text-zinc-800'
                }`}
              >
                Overview
              </Link>
              <Link 
                to={`/build/${projectId}/files`}
                className={`px-4 py-2 border-b-2 whitespace-nowrap ${
                  activeTab === 'files' 
                    ? 'border-zinc-800 text-zinc-800 font-medium' 
                    : 'border-transparent text-zinc-600 hover:text-zinc-800'
                }`}
              >
                Files
              </Link>
              <Link 
                to={`/build/${projectId}/ai`}
                className={`px-4 py-2 border-b-2 whitespace-nowrap ${
                  activeTab === 'ai' 
                    ? 'border-zinc-800 text-zinc-800 font-medium' 
                    : 'border-transparent text-zinc-600 hover:text-zinc-800'
                }`}
              >
                AI Assistant
              </Link>
              <Link 
                to={`/build/${projectId}/settings`}
                className={`px-4 py-2 border-b-2 whitespace-nowrap ${
                  activeTab === 'settings' 
                    ? 'border-zinc-800 text-zinc-800 font-medium' 
                    : 'border-transparent text-zinc-600 hover:text-zinc-800'
                }`}
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Suspense fallback={<ComponentLoader />}>
            <Routes>
              <Route path="/" element={<ProjectOverview project={project} />} />
              <Route path="/files/*" element={<ProjectFiles projectId={project.id} />} />
              <Route path="/ai/*" element={<ProjectAI projectId={project.id} />} />
              <Route path="/settings/*" element={<ProjectSettings project={project} />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
