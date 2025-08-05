import React, { useState, useRef } from 'react';
import { useProjects, ProjectFile } from '../../../context/ProjectContext';

interface FileUploaderProps {
  projectId: string;
  onUploadComplete?: (file: ProjectFile) => void;
}

export default function FileUploader({ projectId, onUploadComplete }: FileUploaderProps) {
  const { createFile } = useProjects();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Process each file
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      };
      
      reader.onload = (e) => {
        const content = e.target?.result as string || '';
        
        // Determine file type from extension
        const extension = file.name.split('.').pop()?.toLowerCase() || '';
        const fileType = getFileType(extension);
        
        // Create file in project context
        const newFile = createFile(
          projectId,
          file.name,
          content,
          fileType
        );
        
        // Simulate network delay for upload
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          
          if (onUploadComplete) {
            onUploadComplete(newFile);
          }
        }, 1000);
      };
      
      reader.readAsText(file);
    });
  };

  const getFileType = (extension: string): string => {
    const typeMap: Record<string, string> = {
      'js': 'js',
      'jsx': 'jsx',
      'ts': 'ts',
      'tsx': 'tsx',
      'css': 'css',
      'scss': 'scss',
      'html': 'html',
      'json': 'json',
      'md': 'md',
      'txt': 'txt'
    };
    
    return typeMap[extension] || 'txt';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        multiple
      />
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? 'border-zinc-500 bg-zinc-50' : 'border-zinc-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        {isUploading ? (
          <div className="space-y-3">
            <div className="text-zinc-600">Uploading... {uploadProgress}%</div>
            <div className="w-full bg-zinc-200 rounded-full h-2.5">
              <div 
                className="bg-zinc-600 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 cursor-pointer">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 mx-auto text-zinc-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
            <div className="text-zinc-600 font-medium">
              Drag and drop files here, or click to select files
            </div>
            <p className="text-zinc-500 text-sm">
              Supported file types: .js, .jsx, .ts, .tsx, .css, .html, .json, .md, .txt
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
