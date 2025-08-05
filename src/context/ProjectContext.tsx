import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'archived' | 'draft';
  ownerId: string;
  deploymentUrl?: string;
  files?: ProjectFile[];
}

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  content: string;
  type: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  size?: number;
}

export interface Deployment {
  id: string;
  projectId: string;
  environment: 'development' | 'staging' | 'production';
  status: 'pending' | 'in_progress' | 'success' | 'failed';
  url: string;
  createdAt: Date;
  completedAt?: Date;
  logs?: string[];
}

interface ProjectContextType {
  projects: Project[];
  deployments: Deployment[];
  createProject: (name: string, description: string) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
  createFile: (projectId: string, name: string, content: string, type: string) => ProjectFile;
  updateFile: (fileId: string, updates: Partial<ProjectFile>) => void;
  deleteFile: (fileId: string) => void;
  getFileById: (fileId: string) => ProjectFile | undefined;
  getFilesByProjectId: (projectId: string) => ProjectFile[];
  createDeployment: (projectId: string, environment: 'development' | 'staging' | 'production') => Deployment;
  getDeploymentsByProjectId: (projectId: string) => Deployment[];
  exportProject: (projectId: string, format: 'zip' | 'json') => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    const storedFiles = localStorage.getItem('projectFiles');
    const storedDeployments = localStorage.getItem('deployments');
    
    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects);
        // Convert string dates back to Date objects
        const projectsWithDates = parsedProjects.map((project: any) => ({
          ...project,
          createdAt: new Date(project.createdAt),
          updatedAt: new Date(project.updatedAt)
        }));
        setProjects(projectsWithDates);
      } catch (error) {
        console.error('Failed to parse stored projects:', error);
      }
    }
    
    if (storedFiles) {
      try {
        const parsedFiles = JSON.parse(storedFiles);
        // Convert string dates back to Date objects
        const filesWithDates = parsedFiles.map((file: any) => ({
          ...file,
          createdAt: new Date(file.createdAt),
          updatedAt: new Date(file.updatedAt)
        }));
        setFiles(filesWithDates);
      } catch (error) {
        console.error('Failed to parse stored files:', error);
      }
    }
    
    if (storedDeployments) {
      try {
        const parsedDeployments = JSON.parse(storedDeployments);
        // Convert string dates back to Date objects
        const deploymentsWithDates = parsedDeployments.map((deployment: any) => ({
          ...deployment,
          createdAt: new Date(deployment.createdAt),
          completedAt: deployment.completedAt ? new Date(deployment.completedAt) : undefined
        }));
        setDeployments(deploymentsWithDates);
      } catch (error) {
        console.error('Failed to parse stored deployments:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('projectFiles', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem('deployments', JSON.stringify(deployments));
  }, [deployments]);

  // Create a new project
  const createProject = useCallback((name: string, description: string): Project => {
    const now = new Date();
    const newProject: Project = {
      id: uuidv4(),
      name,
      description,
      createdAt: now,
      updatedAt: now,
      status: 'draft',
      ownerId: 'current-user-id', // In a real app, this would be the current user's ID
    };
    
    setProjects(prevProjects => [...prevProjects, newProject]);
    return newProject;
  }, []);

  // Update an existing project
  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === id 
          ? { 
              ...project, 
              ...updates, 
              updatedAt: new Date() 
            } 
          : project
      )
    );
  }, []);

  // Delete a project
  const deleteProject = useCallback((id: string) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
    // Also delete all files and deployments associated with this project
    setFiles(prevFiles => prevFiles.filter(file => file.projectId !== id));
    setDeployments(prevDeployments => prevDeployments.filter(deployment => deployment.projectId !== id));
  }, []);

  // Get a project by ID
  const getProjectById = useCallback((id: string): Project | undefined => {
    return projects.find(project => project.id === id);
  }, [projects]);

  // Create a new file
  const createFile = useCallback((projectId: string, name: string, content: string, type: string): ProjectFile => {
    const now = new Date();
    const newFile: ProjectFile = {
      id: uuidv4(),
      name,
      path: `/${name}`,
      content,
      type,
      projectId,
      createdAt: now,
      updatedAt: now,
      size: content.length // Simple size calculation based on content length
    };
    
    setFiles(prevFiles => [...prevFiles, newFile]);
    
    // Update project's updatedAt timestamp
    updateProject(projectId, { updatedAt: now });
    
    return newFile;
  }, [updateProject]);

  // Update an existing file
  const updateFile = useCallback((fileId: string, updates: Partial<ProjectFile>) => {
    let projectId: string | undefined;
    
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.map(file => {
        if (file.id === fileId) {
          projectId = file.projectId;
          return { 
            ...file, 
            ...updates, 
            updatedAt: new Date(),
            // Update size if content changed
            size: updates.content ? updates.content.length : file.size
          };
        }
        return file;
      });
      
      return updatedFiles;
    });
    
    // Update project's updatedAt timestamp if we found the file
    if (projectId) {
      updateProject(projectId, { updatedAt: new Date() });
    }
  }, [updateProject]);

  // Delete a file
  const deleteFile = useCallback((fileId: string) => {
    let projectId: string | undefined;
    
    // Find the project ID before deleting the file
    const fileToDelete = files.find(file => file.id === fileId);
    if (fileToDelete) {
      projectId = fileToDelete.projectId;
    }
    
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    
    // Update project's updatedAt timestamp if we found the file
    if (projectId) {
      updateProject(projectId, { updatedAt: new Date() });
    }
  }, [files, updateProject]);

  // Get a file by ID
  const getFileById = useCallback((fileId: string): ProjectFile | undefined => {
    return files.find(file => file.id === fileId);
  }, [files]);

  // Get all files for a project
  const getFilesByProjectId = useCallback((projectId: string): ProjectFile[] => {
    return files.filter(file => file.projectId === projectId);
  }, [files]);

  // Create a new deployment
  const createDeployment = useCallback((projectId: string, environment: 'development' | 'staging' | 'production'): Deployment => {
    const now = new Date();
    const deploymentId = uuidv4();
    
    const newDeployment: Deployment = {
      id: deploymentId,
      projectId,
      environment,
      status: 'pending',
      url: `https://${environment === 'production' ? '' : environment + '.'}${projectId.substring(0, 8)}.create.xyz`,
      createdAt: now,
      logs: ['Deployment initialized']
    };
    
    setDeployments(prevDeployments => [...prevDeployments, newDeployment]);
    
    // Simulate deployment process
    setTimeout(() => {
      setDeployments(prevDeployments => 
        prevDeployments.map(deployment => 
          deployment.id === deploymentId
            ? { ...deployment, status: 'in_progress', logs: [...(deployment.logs || []), 'Building project...'] }
            : deployment
        )
      );
      
      // Simulate completion after another delay
      setTimeout(() => {
        const completedAt = new Date();
        setDeployments(prevDeployments => 
          prevDeployments.map(deployment => 
            deployment.id === deploymentId
              ? { 
                  ...deployment, 
                  status: 'success', 
                  completedAt,
                  logs: [...(deployment.logs || []), 'Deployment completed successfully']
                }
              : deployment
          )
        );
        
        // Update project with deployment URL
        updateProject(projectId, { 
          deploymentUrl: `https://${environment === 'production' ? '' : environment + '.'}${projectId.substring(0, 8)}.create.xyz`,
          updatedAt: completedAt
        });
      }, 3000);
    }, 2000);
    
    return newDeployment;
  }, [updateProject]);

  // Get all deployments for a project
  const getDeploymentsByProjectId = useCallback((projectId: string): Deployment[] => {
    return deployments.filter(deployment => deployment.projectId === projectId);
  }, [deployments]);

  // Export project
  const exportProject = useCallback((projectId: string, format: 'zip' | 'json') => {
    const project = getProjectById(projectId);
    const projectFiles = getFilesByProjectId(projectId);
    
    if (!project) return;
    
    const exportData = {
      project: {
        id: project.id,
        name: project.name,
        description: project.description,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        status: project.status
      },
      files: projectFiles.map(file => ({
        name: file.name,
        path: file.path,
        content: file.content,
        type: file.type
      }))
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${project.name.replace(/\s+/g, '-').toLowerCase()}-export.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [getProjectById, getFilesByProjectId]);

  return (
    <ProjectContext.Provider 
      value={{ 
        projects,
        deployments,
        createProject,
        updateProject,
        deleteProject,
        getProjectById,
        createFile,
        updateFile,
        deleteFile,
        getFileById,
        getFilesByProjectId,
        createDeployment,
        getDeploymentsByProjectId,
        exportProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
