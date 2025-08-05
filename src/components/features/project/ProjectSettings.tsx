import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, useProjects } from '../../../context/ProjectContext';
import ProjectExport from './ProjectExport';
import DeploymentPanel from './DeploymentPanel';

interface ProjectSettingsProps {
  project: Project;
}

export default function ProjectSettings({ project }: ProjectSettingsProps) {
  const { updateProject, deleteProject } = useProjects();
  const navigate = useNavigate();
  
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'export' | 'deployment'>('general');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Update project
    updateProject(project.id, {
      name,
      description,
      status: status as 'active' | 'archived' | 'draft'
    });
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };
  
  const handleDelete = () => {
    deleteProject(project.id);
    navigate('/build');
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
        <div className="border-b border-zinc-200">
          <div className="flex">
            <button
              className={`px-4 py-2 ${
                activeTab === 'general' 
                  ? 'border-b-2 border-zinc-800 font-medium' 
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === 'export' 
                  ? 'border-b-2 border-zinc-800 font-medium' 
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
              onClick={() => setActiveTab('export')}
            >
              Export
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === 'deployment' 
                  ? 'border-b-2 border-zinc-800 font-medium' 
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
              onClick={() => setActiveTab('deployment')}
            >
              Deployment
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'general' && (
            <div>
              <h2 className="text-xl font-medium mb-6">Project Settings</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-md text-white ${
                      isSubmitting ? 'bg-zinc-400 cursor-not-allowed' : 'bg-zinc-800 hover:bg-zinc-700'
                    }`}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
              
              <div className="mt-8 pt-6 border-t border-zinc-200">
                <h2 className="text-xl font-medium text-red-600 mb-4">Danger Zone</h2>
                <p className="text-red-600 mb-4">
                  Once you delete a project, there is no going back. Please be certain.
                </p>
                
                {showDeleteConfirm ? (
                  <div className="bg-white p-4 rounded-md border border-red-200 mb-4">
                    <p className="font-medium text-red-600 mb-2">Are you absolutely sure?</p>
                    <p className="text-zinc-600 mb-4">
                      This action cannot be undone. This will permanently delete the project and all associated files.
                    </p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-4 py-2 border border-zinc-300 rounded-md text-zinc-700 hover:bg-zinc-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Yes, delete project
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete Project
                  </button>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'export' && (
            <ProjectExport project={project} />
          )}
          
          {activeTab === 'deployment' && (
            <DeploymentPanel project={project} />
          )}
        </div>
      </div>
    </div>
  );
}
