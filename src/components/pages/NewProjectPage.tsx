import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import Breadcrumbs from '../ui/Breadcrumbs';
import { useProjects } from '../../context/ProjectContext';

export default function NewProjectPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { createProject } = useProjects();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Project name is required');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Create the project
      const newProject = createProject(name, description);
      
      // Simulate API delay
      setTimeout(() => {
        // Navigate to the new project
        navigate(`/build/${newProject.id}`);
      }, 500);
    } catch (err) {
      setError('Failed to create project. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow pt-[46px] bg-zinc-50">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Breadcrumbs />
          </div>
          
          <div className="bg-white rounded-lg border border-zinc-200 p-6">
            <h1 className="text-2xl font-semibold mb-6">Create New Project</h1>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Project Name*
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  placeholder="My Awesome Project"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  placeholder="Describe your project (optional)"
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/build')}
                  className="px-4 py-2 border border-zinc-300 rounded-md text-zinc-700 hover:bg-zinc-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md text-white ${
                    isSubmitting ? 'bg-zinc-400 cursor-not-allowed' : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
