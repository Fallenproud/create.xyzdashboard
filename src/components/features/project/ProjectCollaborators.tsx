import React, { useState, useEffect } from 'react';
import { useCollaboration } from '../../../context/CollaborationContext';
import { User } from '../../../context/AuthContext';

interface ProjectCollaboratorsProps {
  projectId: string;
}

export default function ProjectCollaborators({ projectId }: ProjectCollaboratorsProps) {
  const { 
    collaborators, 
    onlineUsers, 
    isLoading, 
    error, 
    getCollaborators, 
    addCollaborator, 
    removeCollaborator,
    startCollaborationSession,
    endCollaborationSession
  } = useCollaboration();
  
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  // Start collaboration session when component mounts
  useEffect(() => {
    startCollaborationSession(projectId);
    
    // Clean up when component unmounts
    return () => {
      endCollaborationSession();
    };
  }, [projectId, startCollaborationSession, endCollaborationSession]);
  
  const handleAddCollaborator = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCollaboratorEmail.trim()) return;
    
    setIsAdding(true);
    
    try {
      await addCollaborator(projectId, newCollaboratorEmail);
      setNewCollaboratorEmail('');
    } catch (err) {
      console.error('Failed to add collaborator:', err);
    } finally {
      setIsAdding(false);
    }
  };
  
  const handleRemoveCollaborator = async (userId: string) => {
    if (window.confirm('Are you sure you want to remove this collaborator?')) {
      try {
        await removeCollaborator(projectId, userId);
      } catch (err) {
        console.error('Failed to remove collaborator:', err);
      }
    }
  };
  
  const isUserOnline = (user: User) => {
    return onlineUsers.some(onlineUser => onlineUser.id === user.id);
  };
  
  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-6">
      <h2 className="text-xl font-medium mb-6">Project Collaborators</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <form onSubmit={handleAddCollaborator} className="flex gap-2">
          <input
            type="email"
            placeholder="Add collaborator by email"
            value={newCollaboratorEmail}
            onChange={(e) => setNewCollaboratorEmail(e.target.value)}
            className="flex-1 border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            required
          />
          <button
            type="submit"
            disabled={isAdding || !newCollaboratorEmail.trim()}
            className={`px-4 py-2 rounded-md text-white ${
              isAdding || !newCollaboratorEmail.trim()
                ? 'bg-zinc-300 cursor-not-allowed'
                : 'bg-zinc-800 hover:bg-zinc-700'
            }`}
          >
            {isAdding ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-zinc-700 mb-2">Collaborators ({collaborators.length})</h3>
        
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-zinc-800"></div>
          </div>
        ) : collaborators.length === 0 ? (
          <p className="text-zinc-500 text-sm py-4">No collaborators yet. Add someone to collaborate on this project.</p>
        ) : (
          <ul className="space-y-2">
            {collaborators.map(user => (
              <li key={user.id} className="flex items-center justify-between p-3 border border-zinc-200 rounded-md">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center text-zinc-600 font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    {isUserOnline(user) && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-zinc-500">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveCollaborator(user.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="mt-6 pt-6 border-t border-zinc-200">
        <h3 className="text-sm font-medium text-zinc-700 mb-2">Real-time Collaboration</h3>
        <p className="text-zinc-600 text-sm mb-4">
          When multiple people are working on the same project, you'll see their changes in real-time.
        </p>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-zinc-600">{onlineUsers.length} user{onlineUsers.length !== 1 ? 's' : ''} online</span>
        </div>
      </div>
    </div>
  );
}
