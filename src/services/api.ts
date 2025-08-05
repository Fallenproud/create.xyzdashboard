/**
 * API Service
 * 
 * This service handles all API requests to the backend.
 * In a production environment, this would connect to a real backend.
 * For now, we're simulating API responses with localStorage.
 */

import { User } from '../context/AuthContext';
import { Project, ProjectFile, Deployment } from '../context/ProjectContext';

// Base API URL - would be replaced with a real API endpoint in production
const API_BASE_URL = 'https://api.create.xyz';

// Simulate network delay for more realistic behavior
const SIMULATED_DELAY = 800;

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication API
export const authAPI = {
  // Login with email/password
  async login(email: string, password: string): Promise<User> {
    await delay(SIMULATED_DELAY);
    
    // In a real app, this would make an API call
    // For now, we'll check against some hardcoded values
    if (email === 'admin@example.com' && password === 'password') {
      const user: User = {
        id: 'admin-1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        token: 'simulated-jwt-token-admin'
      };
      localStorage.setItem('auth_token', user.token);
      return user;
    } else if (email === 'user@example.com' && password === 'password') {
      const user: User = {
        id: 'user-1',
        email: 'user@example.com',
        name: 'Regular User',
        role: 'user',
        token: 'simulated-jwt-token-user'
      };
      localStorage.setItem('auth_token', user.token);
      return user;
    }
    
    throw new Error('Invalid credentials');
  },
  
  // Login with magic link
  async requestMagicLink(email: string): Promise<boolean> {
    await delay(SIMULATED_DELAY);
    
    // In a real app, this would send an email with a magic link
    console.log(`Magic link requested for ${email}`);
    return true;
  },
  
  // Login with OAuth provider
  async loginWithOAuth(provider: 'google' | 'github'): Promise<User> {
    await delay(SIMULATED_DELAY);
    
    // In a real app, this would redirect to the OAuth provider
    // and then handle the callback
    const user: User = {
      id: `${provider}-user-1`,
      email: `user@${provider}.com`,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      role: 'user',
      token: `simulated-jwt-token-${provider}`
    };
    localStorage.setItem('auth_token', user.token);
    return user;
  },
  
  // Logout
  async logout(): Promise<void> {
    await delay(SIMULATED_DELAY);
    localStorage.removeItem('auth_token');
  },
  
  // Check if user is authenticated
  async checkAuth(): Promise<User | null> {
    await delay(SIMULATED_DELAY / 2); // Faster check
    
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    
    // In a real app, this would validate the token with the backend
    if (token === 'simulated-jwt-token-admin') {
      return {
        id: 'admin-1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        token
      };
    } else if (token === 'simulated-jwt-token-user') {
      return {
        id: 'user-1',
        email: 'user@example.com',
        name: 'Regular User',
        role: 'user',
        token
      };
    } else if (token.startsWith('simulated-jwt-token-')) {
      const provider = token.replace('simulated-jwt-token-', '');
      return {
        id: `${provider}-user-1`,
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        role: 'user',
        token
      };
    }
    
    return null;
  }
};

// Projects API
export const projectsAPI = {
  // Get all projects for the current user
  async getProjects(): Promise<Project[]> {
    await delay(SIMULATED_DELAY);
    
    // In a real app, this would fetch from the backend
    // For now, we'll get from localStorage
    const projectsJson = localStorage.getItem('projects');
    if (!projectsJson) return [];
    
    try {
      const projects = JSON.parse(projectsJson);
      return projects.map((project: any) => ({
        ...project,
        createdAt: new Date(project.createdAt),
        updatedAt: new Date(project.updatedAt)
      }));
    } catch (error) {
      console.error('Failed to parse projects:', error);
      return [];
    }
  },
  
  // Get a single project by ID
  async getProject(id: string): Promise<Project | null> {
    await delay(SIMULATED_DELAY);
    
    const projectsJson = localStorage.getItem('projects');
    if (!projectsJson) return null;
    
    try {
      const projects = JSON.parse(projectsJson);
      const project = projects.find((p: any) => p.id === id);
      if (!project) return null;
      
      return {
        ...project,
        createdAt: new Date(project.createdAt),
        updatedAt: new Date(project.updatedAt)
      };
    } catch (error) {
      console.error('Failed to parse projects:', error);
      return null;
    }
  },
  
  // Create a new project
  async createProject(name: string, description: string): Promise<Project> {
    await delay(SIMULATED_DELAY);
    
    // In a real app, this would send to the backend
    // For now, we'll update localStorage directly
    const projectsJson = localStorage.getItem('projects');
    const projects = projectsJson ? JSON.parse(projectsJson) : [];
    
    const newProject: Project = {
      id: Math.random().toString(36).substring(2, 15),
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
      ownerId: 'current-user-id'
    };
    
    localStorage.setItem('projects', JSON.stringify([...projects, newProject]));
    return newProject;
  },
  
  // Update a project
  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    await delay(SIMULATED_DELAY);
    
    const projectsJson = localStorage.getItem('projects');
    if (!projectsJson) throw new Error('Project not found');
    
    try {
      const projects = JSON.parse(projectsJson);
      const projectIndex = projects.findIndex((p: any) => p.id === id);
      if (projectIndex === -1) throw new Error('Project not found');
      
      const updatedProject = {
        ...projects[projectIndex],
        ...updates,
        updatedAt: new Date()
      };
      
      projects[projectIndex] = updatedProject;
      localStorage.setItem('projects', JSON.stringify(projects));
      
      return {
        ...updatedProject,
        createdAt: new Date(updatedProject.createdAt),
        updatedAt: new Date(updatedProject.updatedAt)
      };
    } catch (error) {
      console.error('Failed to update project:', error);
      throw error;
    }
  },
  
  // Delete a project
  async deleteProject(id: string): Promise<void> {
    await delay(SIMULATED_DELAY);
    
    const projectsJson = localStorage.getItem('projects');
    if (!projectsJson) return;
    
    try {
      const projects = JSON.parse(projectsJson);
      const filteredProjects = projects.filter((p: any) => p.id !== id);
      localStorage.setItem('projects', JSON.stringify(filteredProjects));
      
      // Also delete associated files
      const filesJson = localStorage.getItem('projectFiles');
      if (filesJson) {
        const files = JSON.parse(filesJson);
        const filteredFiles = files.filter((f: any) => f.projectId !== id);
        localStorage.setItem('projectFiles', JSON.stringify(filteredFiles));
      }
      
      // And deployments
      const deploymentsJson = localStorage.getItem('deployments');
      if (deploymentsJson) {
        const deployments = JSON.parse(deploymentsJson);
        const filteredDeployments = deployments.filter((d: any) => d.projectId !== id);
        localStorage.setItem('deployments', JSON.stringify(filteredDeployments));
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw error;
    }
  }
};

// Files API
export const filesAPI = {
  // Get all files for a project
  async getProjectFiles(projectId: string): Promise<ProjectFile[]> {
    await delay(SIMULATED_DELAY);
    
    const filesJson = localStorage.getItem('projectFiles');
    if (!filesJson) return [];
    
    try {
      const files = JSON.parse(filesJson);
      const projectFiles = files.filter((f: any) => f.projectId === projectId);
      return projectFiles.map((file: any) => ({
        ...file,
        createdAt: new Date(file.createdAt),
        updatedAt: new Date(file.updatedAt)
      }));
    } catch (error) {
      console.error('Failed to parse files:', error);
      return [];
    }
  },
  
  // Create a new file
  async createFile(projectId: string, name: string, content: string, type: string): Promise<ProjectFile> {
    await delay(SIMULATED_DELAY);
    
    const filesJson = localStorage.getItem('projectFiles');
    const files = filesJson ? JSON.parse(filesJson) : [];
    
    const newFile: ProjectFile = {
      id: Math.random().toString(36).substring(2, 15),
      name,
      path: `/${name}`,
      content,
      type,
      projectId,
      createdAt: new Date(),
      updatedAt: new Date(),
      size: content.length
    };
    
    localStorage.setItem('projectFiles', JSON.stringify([...files, newFile]));
    
    // Update project's updatedAt timestamp
    const projectsJson = localStorage.getItem('projects');
    if (projectsJson) {
      const projects = JSON.parse(projectsJson);
      const projectIndex = projects.findIndex((p: any) => p.id === projectId);
      if (projectIndex !== -1) {
        projects[projectIndex].updatedAt = new Date();
        localStorage.setItem('projects', JSON.stringify(projects));
      }
    }
    
    return newFile;
  },
  
  // Update a file
  async updateFile(fileId: string, updates: Partial<ProjectFile>): Promise<ProjectFile> {
    await delay(SIMULATED_DELAY);
    
    const filesJson = localStorage.getItem('projectFiles');
    if (!filesJson) throw new Error('File not found');
    
    try {
      const files = JSON.parse(filesJson);
      const fileIndex = files.findIndex((f: any) => f.id === fileId);
      if (fileIndex === -1) throw new Error('File not found');
      
      const updatedFile = {
        ...files[fileIndex],
        ...updates,
        updatedAt: new Date(),
        size: updates.content ? updates.content.length : files[fileIndex].size
      };
      
      files[fileIndex] = updatedFile;
      localStorage.setItem('projectFiles', JSON.stringify(files));
      
      // Update project's updatedAt timestamp
      const projectId = updatedFile.projectId;
      const projectsJson = localStorage.getItem('projects');
      if (projectsJson) {
        const projects = JSON.parse(projectsJson);
        const projectIndex = projects.findIndex((p: any) => p.id === projectId);
        if (projectIndex !== -1) {
          projects[projectIndex].updatedAt = new Date();
          localStorage.setItem('projects', JSON.stringify(projects));
        }
      }
      
      return {
        ...updatedFile,
        createdAt: new Date(updatedFile.createdAt),
        updatedAt: new Date(updatedFile.updatedAt)
      };
    } catch (error) {
      console.error('Failed to update file:', error);
      throw error;
    }
  },
  
  // Delete a file
  async deleteFile(fileId: string): Promise<void> {
    await delay(SIMULATED_DELAY);
    
    const filesJson = localStorage.getItem('projectFiles');
    if (!filesJson) return;
    
    try {
      const files = JSON.parse(filesJson);
      const fileToDelete = files.find((f: any) => f.id === fileId);
      if (!fileToDelete) return;
      
      const projectId = fileToDelete.projectId;
      const filteredFiles = files.filter((f: any) => f.id !== fileId);
      localStorage.setItem('projectFiles', JSON.stringify(filteredFiles));
      
      // Update project's updatedAt timestamp
      const projectsJson = localStorage.getItem('projects');
      if (projectsJson) {
        const projects = JSON.parse(projectsJson);
        const projectIndex = projects.findIndex((p: any) => p.id === projectId);
        if (projectIndex !== -1) {
          projects[projectIndex].updatedAt = new Date();
          localStorage.setItem('projects', JSON.stringify(projects));
        }
      }
    } catch (error) {
      console.error('Failed to delete file:', error);
      throw error;
    }
  }
};

// Deployments API
export const deploymentsAPI = {
  // Get all deployments for a project
  async getProjectDeployments(projectId: string): Promise<Deployment[]> {
    await delay(SIMULATED_DELAY);
    
    const deploymentsJson = localStorage.getItem('deployments');
    if (!deploymentsJson) return [];
    
    try {
      const deployments = JSON.parse(deploymentsJson);
      const projectDeployments = deployments.filter((d: any) => d.projectId === projectId);
      return projectDeployments.map((deployment: any) => ({
        ...deployment,
        createdAt: new Date(deployment.createdAt),
        completedAt: deployment.completedAt ? new Date(deployment.completedAt) : undefined
      }));
    } catch (error) {
      console.error('Failed to parse deployments:', error);
      return [];
    }
  },
  
  // Create a new deployment
  async createDeployment(
    projectId: string, 
    environment: 'development' | 'staging' | 'production'
  ): Promise<Deployment> {
    await delay(SIMULATED_DELAY);
    
    const deploymentsJson = localStorage.getItem('deployments');
    const deployments = deploymentsJson ? JSON.parse(deploymentsJson) : [];
    
    const deploymentId = Math.random().toString(36).substring(2, 15);
    const now = new Date();
    
    const newDeployment: Deployment = {
      id: deploymentId,
      projectId,
      environment,
      status: 'pending',
      url: `https://${environment === 'production' ? '' : environment + '.'}${projectId.substring(0, 8)}.create.xyz`,
      createdAt: now,
      logs: ['Deployment initialized']
    };
    
    localStorage.setItem('deployments', JSON.stringify([...deployments, newDeployment]));
    
    // Simulate deployment process
    setTimeout(() => {
      const deploymentsJson = localStorage.getItem('deployments');
      if (!deploymentsJson) return;
      
      const deployments = JSON.parse(deploymentsJson);
      const deploymentIndex = deployments.findIndex((d: any) => d.id === deploymentId);
      if (deploymentIndex === -1) return;
      
      deployments[deploymentIndex] = {
        ...deployments[deploymentIndex],
        status: 'in_progress',
        logs: [...deployments[deploymentIndex].logs, 'Building project...']
      };
      
      localStorage.setItem('deployments', JSON.stringify(deployments));
      
      // Simulate completion after another delay
      setTimeout(() => {
        const deploymentsJson = localStorage.getItem('deployments');
        if (!deploymentsJson) return;
        
        const deployments = JSON.parse(deploymentsJson);
        const deploymentIndex = deployments.findIndex((d: any) => d.id === deploymentId);
        if (deploymentIndex === -1) return;
        
        const completedAt = new Date();
        deployments[deploymentIndex] = {
          ...deployments[deploymentIndex],
          status: 'success',
          completedAt,
          logs: [...deployments[deploymentIndex].logs, 'Deployment completed successfully']
        };
        
        localStorage.setItem('deployments', JSON.stringify(deployments));
        
        // Update project with deployment URL
        const projectsJson = localStorage.getItem('projects');
        if (projectsJson) {
          const projects = JSON.parse(projectsJson);
          const projectIndex = projects.findIndex((p: any) => p.id === projectId);
          if (projectIndex !== -1) {
            projects[projectIndex] = {
              ...projects[projectIndex],
              deploymentUrl: `https://${environment === 'production' ? '' : environment + '.'}${projectId.substring(0, 8)}.create.xyz`,
              updatedAt: completedAt
            };
            localStorage.setItem('projects', JSON.stringify(projects));
          }
        }
      }, 3000);
    }, 2000);
    
    return newDeployment;
  }
};

// Collaboration API
export const collaborationAPI = {
  // Get all collaborators for a project
  async getCollaborators(projectId: string): Promise<User[]> {
    await delay(SIMULATED_DELAY);
    
    // In a real app, this would fetch from the backend
    // For now, we'll return some mock data
    return [
      {
        id: 'user-1',
        email: 'user@example.com',
        name: 'Regular User',
        role: 'user'
      },
      {
        id: 'user-2',
        email: 'collaborator@example.com',
        name: 'Collaborator',
        role: 'user'
      }
    ];
  },
  
  // Add a collaborator to a project
  async addCollaborator(projectId: string, email: string): Promise<User> {
    await delay(SIMULATED_DELAY);
    
    // In a real app, this would send an invitation to the user
    // For now, we'll just return a mock user
    return {
      id: 'user-' + Math.random().toString(36).substring(2, 15),
      email,
      name: email.split('@')[0],
      role: 'user'
    };
  },
  
  // Remove a collaborator from a project
  async removeCollaborator(projectId: string, userId: string): Promise<void> {
    await delay(SIMULATED_DELAY);
    
    // In a real app, this would remove the user from the project
    console.log(`Removed user ${userId} from project ${projectId}`);
  },
  
  // Get online users for a project
  async getOnlineUsers(projectId: string): Promise<User[]> {
    await delay(SIMULATED_DELAY / 2); // Faster check
    
    // In a real app, this would use WebSockets to get real-time data
    // For now, we'll return some mock data
    return [
      {
        id: 'user-1',
        email: 'user@example.com',
        name: 'Regular User',
        role: 'user'
      }
    ];
  }
};
