import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Breadcrumbs from '../ui/Breadcrumbs';
import { useProjects } from '../../context/ProjectContext';

export default function BuildPage() {
  const { projects } = useProjects();
  
  // Filter active projects
  const activeProjects = projects.filter(project => project.status === 'active');
  const draftProjects = projects.filter(project => project.status === 'draft');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow pt-[46px] bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Breadcrumbs />
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Build Dashboard</h1>
            <Link 
              to="/build/new" 
              className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-700 transition-colors"
            >
              New Project
            </Link>
          </div>
          
          {projects.length === 0 ? (
            <div className="bg-white rounded-lg border border-zinc-200 p-8 text-center">
              <h2 className="text-xl font-medium mb-4">Welcome to Create</h2>
              <p className="text-zinc-600 mb-6">
                You don't have any projects yet. Create your first project to get started.
              </p>
              <Link 
                to="/build/new" 
                className="bg-zinc-800 text-white px-6 py-3 rounded-md hover:bg-zinc-700 transition-colors inline-block"
              >
                Create First Project
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {activeProjects.length > 0 && (
                <div>
                  <h2 className="text-xl font-medium mb-4">Active Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeProjects.map(project => (
                      <Link 
                        key={project.id} 
                        to={`/build/${project.id}`}
                        className="bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="p-6">
                          <h3 className="text-lg font-medium mb-2">{project.name}</h3>
                          <p className="text-zinc-600 text-sm mb-4">{project.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-zinc-500">
                              Updated {project.updatedAt.toLocaleDateString()}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {draftProjects.length > 0 && (
                <div>
                  <h2 className="text-xl font-medium mb-4">Draft Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {draftProjects.map(project => (
                      <Link 
                        key={project.id} 
                        to={`/build/${project.id}`}
                        className="bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="p-6">
                          <h3 className="text-lg font-medium mb-2">{project.name}</h3>
                          <p className="text-zinc-600 text-sm mb-4">{project.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-zinc-500">
                              Created {project.createdAt.toLocaleDateString()}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                              Draft
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
