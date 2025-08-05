import React from 'react';
import ChatInterface from '../ChatInterface';

interface ProjectAIProps {
  projectId: string;
}

export default function ProjectAI({ projectId }: ProjectAIProps) {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-6">
      <h2 className="text-xl font-medium mb-6">AI Assistant</h2>
      
      <p className="text-zinc-600 mb-6">
        Ask the AI assistant for help with your project. You can ask for code examples, 
        debugging help, or guidance on implementing features.
      </p>
      
      <div className="h-[500px]">
        <ChatInterface projectContext={projectId} />
      </div>
      
      <div className="mt-6 p-4 bg-zinc-50 rounded-lg border border-zinc-200">
        <h3 className="font-medium mb-2">Example Prompts</h3>
        <ul className="space-y-2 text-sm text-zinc-600">
          <li>"Create a responsive navigation bar with a logo, links, and a mobile menu"</li>
          <li>"Help me implement form validation for email and password fields"</li>
          <li>"Generate a React component for displaying user profile information"</li>
          <li>"How do I implement authentication with JWT tokens?"</li>
        </ul>
      </div>
    </div>
  );
}
