import React, { useState } from 'react';
import { useProjects } from '../../../context/ProjectContext';
import FileUploader from './FileUploader';

interface ProjectFilesProps {
  projectId: string;
}

export default function ProjectFiles({ projectId }: ProjectFilesProps) {
  const { getFilesByProjectId, createFile, deleteFile, updateFile } = useProjects();
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [newFileType, setNewFileType] = useState('js');
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState('');
  
  const files = getFilesByProjectId(projectId);
  
  const handleCreateFile = () => {
    if (!newFileName.trim()) return;
    
    createFile(
      projectId,
      newFileName,
      newFileContent,
      newFileType
    );
    
    // Reset form
    setNewFileName('');
    setNewFileContent('');
    setNewFileType('js');
    setIsCreatingFile(false);
  };
  
  const handleDeleteFile = (fileId: string) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      deleteFile(fileId);
      if (selectedFile === fileId) {
        setSelectedFile(null);
        setEditMode(false);
      }
    }
  };
  
  const handleEditFile = () => {
    if (!selectedFile) return;
    
    const fileData = files.find(file => file.id === selectedFile);
    if (fileData) {
      setEditContent(fileData.content);
      setEditMode(true);
    }
  };
  
  const handleSaveEdit = () => {
    if (!selectedFile) return;
    
    updateFile(selectedFile, { content: editContent });
    setEditMode(false);
  };
  
  const handleCancelEdit = () => {
    setEditMode(false);
  };
  
  const selectedFileData = selectedFile ? files.find(file => file.id === selectedFile) : null;
  
  return (
    <div className="space-y-6">
      <FileUploader 
        projectId={projectId} 
        onUploadComplete={(file) => setSelectedFile(file.id)}
      />
      
      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
        <div className="p-6 border-b border-zinc-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Project Files</h2>
            <button 
              onClick={() => setIsCreatingFile(!isCreatingFile)}
              className="bg-zinc-800 text-white px-3 py-1 rounded-md hover:bg-zinc-700 transition-colors text-sm"
            >
              {isCreatingFile ? 'Cancel' : 'New File'}
            </button>
          </div>
          
          {isCreatingFile && (
            <div className="mt-4 p-4 border border-zinc-200 rounded-lg">
              <h3 className="font-medium mb-3">Create New File</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    File Name
                  </label>
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    placeholder="index.js"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    File Type
                  </label>
                  <select
                    value={newFileType}
                    onChange={(e) => setNewFileType(e.target.value)}
                    className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  >
                    <option value="js">JavaScript</option>
                    <option value="jsx">React JSX</option>
                    <option value="ts">TypeScript</option>
                    <option value="tsx">React TSX</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                    <option value="json">JSON</option>
                    <option value="md">Markdown</option>
                    <option value="txt">Text</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Initial Content (optional)
                  </label>
                  <textarea
                    value={newFileContent}
                    onChange={(e) => setNewFileContent(e.target.value)}
                    rows={5}
                    className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500 font-mono text-sm"
                    placeholder="// Your code here"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={handleCreateFile}
                    className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-700 transition-colors"
                  >
                    Create File
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* File list */}
          <div className="w-full md:w-64 border-r border-zinc-200 p-4">
            <h3 className="font-medium mb-3 text-sm text-zinc-500">Files ({files.length})</h3>
            
            {files.length === 0 ? (
              <p className="text-zinc-500 text-sm">No files yet. Create your first file or upload files.</p>
            ) : (
              <ul className="space-y-1">
                {files.map(file => (
                  <li key={file.id}>
                    <button
                      onClick={() => {
                        setSelectedFile(file.id);
                        setEditMode(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
                        selectedFile === file.id 
                          ? 'bg-zinc-100 text-zinc-900' 
                          : 'text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      <span className="truncate">{file.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(file.id);
                        }}
                        className="text-zinc-400 hover:text-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* File content */}
          <div className="flex-1 p-4">
            {selectedFileData ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{selectedFileData.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-zinc-100 px-2 py-1 rounded text-zinc-600">
                      {selectedFileData.type.toUpperCase()}
                    </span>
                    {!editMode ? (
                      <button
                        onClick={handleEditFile}
                        className="text-xs bg-zinc-800 text-white px-2 py-1 rounded hover:bg-zinc-700"
                      >
                        Edit
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-xs bg-zinc-500 text-white px-2 py-1 rounded hover:bg-zinc-600"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {editMode ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-[500px] border border-zinc-300 rounded-md p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  />
                ) : (
                  <div className="border border-zinc-200 rounded-md p-4 bg-zinc-50 font-mono text-sm overflow-auto max-h-[500px]">
                    <pre>{selectedFileData.content || '// Empty file'}</pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-zinc-500">
                {files.length > 0 ? 'Select a file to view its content' : 'Create a file to get started'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
