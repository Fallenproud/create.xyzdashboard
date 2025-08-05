import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../layout/Header';
import Breadcrumbs from '../ui/Breadcrumbs';
import ChatInterface from '../features/ChatInterface';

// Lazy loaded components
const Projects = lazy(() => import('../features/dashboard/Projects'));
const Settings = lazy(() => import('../features/dashboard/Settings'));
const Build = lazy(() => import('../features/dashboard/Build'));

// Loading component
const ComponentLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-800"></div>
  </div>
);

// Dashboard Home component
const DashboardHome = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome to Create</h1>
      <p className="text-zinc-600 mb-8">Build and deploy your ideas with AI assistance</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Quick Start</h2>
          <p className="text-zinc-600 mb-4">Get started with your first project</p>
          <Link 
            to="/dashboard/build" 
            className="inline-flex items-center text-sm font-medium text-zinc-900 hover:text-zinc-700"
          >
            Create new project
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Recent Projects</h2>
          <p className="text-zinc-600 mb-4">Continue where you left off</p>
          <Link 
            to="/dashboard/projects" 
            className="inline-flex items-center text-sm font-medium text-zinc-900 hover:text-zinc-700"
          >
            View all projects
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">AI Assistant</h2>
        <ChatInterface />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-grow pt-[46px]">
        {/* Sidebar - Desktop */}
        <div className="w-64 bg-zinc-100 p-4 hidden md:block">
          <div className="mb-6">
            <div className="text-sm text-zinc-500 mb-2">Signed in as:</div>
            <div className="font-medium">{user?.name}</div>
            <div className="text-sm text-zinc-500">{user?.email}</div>
            <div className="text-xs bg-zinc-200 inline-block px-2 py-1 rounded mt-1">
              {user?.role === 'admin' ? 'Admin' : 'User'}
            </div>
          </div>
          
          <nav className="space-y-1">
            <Link 
              to="/dashboard" 
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/dashboard' 
                  ? 'bg-zinc-200 text-zinc-900' 
                  : 'text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/dashboard/build" 
              className={`block px-3 py-2 rounded-md ${
                location.pathname.includes('/dashboard/build') 
                  ? 'bg-zinc-200 text-zinc-900' 
                  : 'text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Build
            </Link>
            <Link 
              to="/dashboard/projects" 
              className={`block px-3 py-2 rounded-md ${
                location.pathname.includes('/dashboard/projects') 
                  ? 'bg-zinc-200 text-zinc-900' 
                  : 'text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Projects
            </Link>
            <Link 
              to="/dashboard/settings" 
              className={`block px-3 py-2 rounded-md ${
                location.pathname.includes('/dashboard/settings') 
                  ? 'bg-zinc-200 text-zinc-900' 
                  : 'text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Settings
            </Link>
          </nav>
          
          <div className="mt-6">
            <button 
              onClick={logout}
              className="w-full px-3 py-2 text-left text-red-600 hover:bg-zinc-200 rounded-md"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        {/* Mobile sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-20 md:hidden">
            <div className="absolute inset-0 bg-black opacity-50" onClick={toggleMobileSidebar}></div>
            <div className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg">
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <div className="font-medium">Menu</div>
                  <button onClick={toggleMobileSidebar} className="text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-zinc-500 mb-2">Signed in as:</div>
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-sm text-zinc-500">{user?.email}</div>
                  <div className="text-xs bg-zinc-200 inline-block px-2 py-1 rounded mt-1">
                    {user?.role === 'admin' ? 'Admin' : 'User'}
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <Link 
                    to="/dashboard" 
                    className={`block px-3 py-2 rounded-md ${
                      location.pathname === '/dashboard' 
                        ? 'bg-zinc-200 text-zinc-900' 
                        : 'text-zinc-700 hover:bg-zinc-200'
                    }`}
                    onClick={toggleMobileSidebar}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/dashboard/build" 
                    className={`block px-3 py-2 rounded-md ${
                      location.pathname.includes('/dashboard/build') 
                        ? 'bg-zinc-200 text-zinc-900' 
                        : 'text-zinc-700 hover:bg-zinc-200'
                    }`}
                    onClick={toggleMobileSidebar}
                  >
                    Build
                  </Link>
                  <Link 
                    to="/dashboard/projects" 
                    className={`block px-3 py-2 rounded-md ${
                      location.pathname.includes('/dashboard/projects') 
                        ? 'bg-zinc-200 text-zinc-900' 
                        : 'text-zinc-700 hover:bg-zinc-200'
                    }`}
                    onClick={toggleMobileSidebar}
                  >
                    Projects
                  </Link>
                  <Link 
                    to="/dashboard/settings" 
                    className={`block px-3 py-2 rounded-md ${
                      location.pathname.includes('/dashboard/settings') 
                        ? 'bg-zinc-200 text-zinc-900' 
                        : 'text-zinc-700 hover:bg-zinc-200'
                    }`}
                    onClick={toggleMobileSidebar}
                  >
                    Settings
                  </Link>
                </nav>
                
                <div className="mt-6">
                  <button 
                    onClick={() => {
                      logout();
                      toggleMobileSidebar();
                    }}
                    className="w-full px-3 py-2 text-left text-red-600 hover:bg-zinc-200 rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed bottom-4 right-4 z-10">
          <button 
            onClick={toggleMobileSidebar}
            className="bg-zinc-800 text-white p-3 rounded-full shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-auto bg-zinc-50">
          <div className="p-4 border-b bg-white">
            <Breadcrumbs />
          </div>
          
          <Suspense fallback={<ComponentLoader />}>
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/build/*" element={<Build />} />
              <Route path="/projects/*" element={<Projects />} />
              <Route path="/settings/*" element={<Settings />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
