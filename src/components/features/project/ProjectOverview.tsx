import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../../context/ProjectContext';
import ChatInterface from '../ChatInterface';
import ProjectCollaborators from './ProjectCollaborators';

interface ProjectOverviewProps {
  project: Project;
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-zinc-200 p-6">
        <h2 className="text-xl font-medium mb-4">Project Details</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-zinc-500">Description</h3>
            <p className="mt-1">{project.description || 'No description provided.'}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-zinc-500">Created</h3>
              <p className="mt-1">{project.createdAt.toLocaleDateString()}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-zinc-500">Last Updated</h3>
              <p className="mt-1">{project.updatedAt.toLocaleDateString()}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-zinc-500">Status</h3>
              <p className="mt-1 capitalize">{project.status}</p>
            </div>
          </div>
          
          {project.deploymentUrl && (
            <div className="mt-2 pt-4 border-t border-zinc-200">
              <h3 className="text-sm font-medium text-zinc-500">Deployment URL</h3>
              <a 
                href={project.deploymentUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-1 text-blue-600 hover:underline flex items-center"
              >
                {project.deploymentUrl}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-zinc-200 p-6">
          <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              to={`/build/${project.id}/files`}
              className="flex items-center p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50"
            >
              <div className="mr-4 bg-zinc-100 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Manage Files</h3>
                <p className="text-sm text-zinc-500">View and edit project files</p>
              </div>
            </Link>
            
            <Link 
              to={`/build/${project.id}/ai`}
              className="flex items-center p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50"
            >
              <div className="mr-4 bg-zinc-100 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">AI Assistant</h3>
                <p className="text-sm text-zinc-500">Get help with your project</p>
              </div>
            </Link>
            
            <Link 
              to={`/build/${project.id}/settings`}
              className="flex items-center p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50"
            >
              <div className="mr-4 bg-zinc-100 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Settings</h3>
                <p className="text-sm text-zinc-500">Configure project settings</p>
              </div>
            </Link>
            
            <Link 
              to={`/build/${project.id}/settings`}
              state={{ tab: 'deployment' }}
              className="flex items-center p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50"
            >
              <div className="mr-4 bg-zinc-100 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Deploy</h3>
                <p className="text-sm text-zinc-500">Deploy your project</p>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-zinc-200 p-6">
          <h2 className="text-xl font-medium mb-4">AI Assistant</h2>
          <p className="text-zinc-600 mb-4">
            Ask the AI assistant for help with your project.
          </p>
          <div className="h-[200px]">
            <ChatInterface projectContext={project.name} />
          </div>
        </div>
      </div>
      
      <ProjectCollaborators projectId={project.id} />
    </div>
  );
}
