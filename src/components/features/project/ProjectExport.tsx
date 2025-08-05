import React, { useState } from 'react';
import { Project, ProjectFile, useProjects } from '../../../context/ProjectContext';

interface ProjectExportProps {
  project: Project;
}

export default function ProjectExport({ project }: ProjectExportProps) {
  const { getFilesByProjectId } = useProjects();
  const [exportFormat, setExportFormat] = useState<'zip' | 'json'>('zip');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  
  const files = getFilesByProjectId(project.id);
  
  const handleExport = () => {
    setIsExporting(true);
    setExportSuccess(false);
    
    // Simulate export process
    setTimeout(() => {
      if (exportFormat === 'zip') {
        exportAsZip(project, files);
      } else {
        exportAsJson(project, files);
      }
      
      setIsExporting(false);
      setExportSuccess(true);
      
      // Reset success message after a delay
      setTimeout(() => {
        setExportSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  const exportAsZip = (project: Project, files: ProjectFile[]) => {
    // In a real implementation, this would create a zip file
    // For now, we'll just create a JSON representation and download it
    
    const projectData = {
      project,
      files: files.map(file => ({
        name: file.name,
        path: file.path,
        content: file.content,
        type: file.type
      }))
    };
    
    const dataStr = JSON.stringify(projectData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${project.name.replace(/\s+/g, '-').toLowerCase()}-export.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  const exportAsJson = (project: Project, files: ProjectFile[]) => {
    const projectData = {
      project: {
        id: project.id,
        name: project.name,
        description: project.description,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        status: project.status
      },
      files: files.map(file => ({
        id: file.id,
        name: file.name,
        path: file.path,
        content: file.content,
        type: file.type
      }))
    };
    
    const dataStr = JSON.stringify(projectData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${project.name.replace(/\s+/g, '-').toLowerCase()}-export.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-6 mb-6">
      <h2 className="text-xl font-medium mb-4">Export Project</h2>
      
      <p className="text-zinc-600 mb-6">
        Export your project files to continue development in your local environment or to share with others.
      </p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Export Format
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="exportFormat"
                value="zip"
                checked={exportFormat === 'zip'}
                onChange={() => setExportFormat('zip')}
                className="h-4 w-4 text-zinc-800 focus:ring-zinc-500 border-zinc-300"
              />
              <span className="ml-2 text-zinc-700">ZIP Archive</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="exportFormat"
                value="json"
                checked={exportFormat === 'json'}
                onChange={() => setExportFormat('json')}
                className="h-4 w-4 text-zinc-800 focus:ring-zinc-500 border-zinc-300"
              />
              <span className="ml-2 text-zinc-700">JSON</span>
            </label>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-zinc-700 mb-2">Files to Export ({files.length})</h3>
          {files.length === 0 ? (
            <p className="text-zinc-500 text-sm">No files to export. Add files to your project first.</p>
          ) : (
            <div className="max-h-40 overflow-y-auto border border-zinc-200 rounded-md p-2">
              <ul className="space-y-1">
                {files.map(file => (
                  <li key={file.id} className="text-sm text-zinc-700 flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-zinc-400 mr-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                      />
                    </svg>
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <button
            onClick={handleExport}
            disabled={isExporting || files.length === 0}
            className={`px-4 py-2 rounded-md text-white ${
              isExporting || files.length === 0
                ? 'bg-zinc-400 cursor-not-allowed'
                : 'bg-zinc-800 hover:bg-zinc-700'
            }`}
          >
            {isExporting ? 'Exporting...' : `Export as ${exportFormat.toUpperCase()}`}
          </button>
          
          {exportSuccess && (
            <span className="ml-4 text-green-600 flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              Export successful!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
