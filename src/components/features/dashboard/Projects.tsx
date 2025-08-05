import React, { useState } from 'react';

interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdated: Date;
  status: 'active' | 'archived' | 'draft';
}

// Sample project data
const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Website',
    description: 'A modern e-commerce platform with product catalog and checkout',
    lastUpdated: new Date(2023, 5, 15),
    status: 'active'
  },
  {
    id: '2',
    name: 'Portfolio Site',
    description: 'Personal portfolio website with project showcase',
    lastUpdated: new Date(2023, 4, 22),
    status: 'active'
  },
  {
    id: '3',
    name: 'Blog Platform',
    description: 'Content management system for blog posts',
    lastUpdated: new Date(2023, 3, 10),
    status: 'draft'
  }
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [filter, setFilter] = useState<'all' | 'active' | 'archived' | 'draft'>('all');

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  const handleStatusChange = (projectId: string, newStatus: 'active' | 'archived' | 'draft') => {
    setProjects(projects.map(project => 
      project.id === projectId ? { ...project, status: newStatus } : project
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Your Projects</h1>
        <button className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-700 transition-colors">
          New Project
        </button>
      </div>
      
      <div className="mb-6">
        <div className="flex space-x-2 border-b border-zinc-200">
          <button 
            className={`px-4 py-2 ${filter === 'all' ? 'border-b-2 border-zinc-800 font-medium' : 'text-zinc-500'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 ${filter === 'active' ? 'border-b-2 border-zinc-800 font-medium' : 'text-zinc-500'}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`px-4 py-2 ${filter === 'draft' ? 'border-b-2 border-zinc-800 font-medium' : 'text-zinc-500'}`}
            onClick={() => setFilter('draft')}
          >
            Drafts
          </button>
          <button 
            className={`px-4 py-2 ${filter === 'archived' ? 'border-b-2 border-zinc-800 font-medium' : 'text-zinc-500'}`}
            onClick={() => setFilter('archived')}
          >
            Archived
          </button>
        </div>
      </div>
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-500">No projects found.</p>
          <button className="mt-4 text-zinc-800 underline">Create your first project</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-2">{project.name}</h3>
                <p className="text-zinc-600 text-sm mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-500">
                    Updated {project.lastUpdated.toLocaleDateString()}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'active' ? 'bg-green-100 text-green-800' :
                    project.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-zinc-100 text-zinc-800'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="bg-zinc-50 px-6 py-3 border-t border-zinc-200 flex justify-between">
                <button className="text-sm text-zinc-700 hover:text-zinc-900">Edit</button>
                <div className="relative group">
                  <button className="text-sm text-zinc-700 hover:text-zinc-900">
                    More
                  </button>
                  <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-white shadow-lg rounded-md border border-zinc-200 w-36 z-10">
                    <div className="py-1">
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                        onClick={() => handleStatusChange(project.id, 'active')}
                      >
                        Set as Active
                      </button>
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                        onClick={() => handleStatusChange(project.id, 'draft')}
                      >
                        Move to Drafts
                      </button>
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                        onClick={() => handleStatusChange(project.id, 'archived')}
                      >
                        Archive
                      </button>
                      <div className="border-t border-zinc-200 my-1"></div>
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-zinc-100">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
