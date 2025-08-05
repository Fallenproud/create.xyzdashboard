import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from './AuthContext';
import { collaborationAPI } from '../services/api';

interface CollaborationContextType {
  collaborators: User[];
  onlineUsers: User[];
  isLoading: boolean;
  error: string | null;
  getCollaborators: (projectId: string) => Promise<void>;
  addCollaborator: (projectId: string, email: string) => Promise<void>;
  removeCollaborator: (projectId: string, userId: string) => Promise<void>;
  startCollaborationSession: (projectId: string) => void;
  endCollaborationSession: () => void;
}

const CollaborationContext = createContext<CollaborationContextType | undefined>(undefined);

export const CollaborationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  // Clean up polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const getCollaborators = useCallback(async (projectId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedCollaborators = await collaborationAPI.getCollaborators(projectId);
      setCollaborators(fetchedCollaborators);
    } catch (err) {
      console.error('Failed to fetch collaborators:', err);
      setError('Failed to load collaborators');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addCollaborator = useCallback(async (projectId: string, email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newCollaborator = await collaborationAPI.addCollaborator(projectId, email);
      setCollaborators(prev => [...prev, newCollaborator]);
    } catch (err) {
      console.error('Failed to add collaborator:', err);
      setError('Failed to add collaborator');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeCollaborator = useCallback(async (projectId: string, userId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await collaborationAPI.removeCollaborator(projectId, userId);
      setCollaborators(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Failed to remove collaborator:', err);
      setError('Failed to remove collaborator');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startCollaborationSession = useCallback((projectId: string) => {
    setActiveProjectId(projectId);
    
    // Load initial collaborators
    getCollaborators(projectId);
    
    // Set up polling for online users
    const interval = setInterval(async () => {
      try {
        const online = await collaborationAPI.getOnlineUsers(projectId);
        setOnlineUsers(online);
      } catch (err) {
        console.error('Failed to fetch online users:', err);
      }
    }, 10000); // Poll every 10 seconds
    
    setPollingInterval(interval);
    
    // In a real app, this would also set up WebSocket connection
    console.log(`Started collaboration session for project ${projectId}`);
  }, [getCollaborators]);

  const endCollaborationSession = useCallback(() => {
    setActiveProjectId(null);
    
    // Clear polling interval
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    
    // In a real app, this would also close WebSocket connection
    console.log('Ended collaboration session');
  }, [pollingInterval]);

  return (
    <CollaborationContext.Provider
      value={{
        collaborators,
        onlineUsers,
        isLoading,
        error,
        getCollaborators,
        addCollaborator,
        removeCollaborator,
        startCollaborationSession,
        endCollaborationSession
      }}
    >
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (context === undefined) {
    throw new Error('useCollaboration must be used within a CollaborationProvider');
  }
  return context;
};
