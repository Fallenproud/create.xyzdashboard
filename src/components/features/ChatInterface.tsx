import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  projectContext?: string;
  height?: string;
}

export default function ChatInterface({ projectContext, height = '400px' }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: projectContext 
        ? `Hi there! I'm your AI assistant for the "${projectContext}" project. How can I help you today?` 
        : 'Hi there! I\'m your AI assistant. How can I help you build your project today?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      let responseContent = '';
      let shouldNavigate = false;
      let navigateTo = '';
      
      // Check for build-related keywords to trigger navigation
      if (!projectContext && (
          inputValue.toLowerCase().includes('build') || 
          inputValue.toLowerCase().includes('create') || 
          inputValue.toLowerCase().includes('new project'))) {
        responseContent = "I'll help you build a new project. Let's go to the build page to get started.";
        shouldNavigate = true;
        navigateTo = '/build/new';
      } 
      // Project-specific responses
      else if (projectContext) {
        if (inputValue.toLowerCase().includes('file') || inputValue.toLowerCase().includes('code')) {
          responseContent = "I can help you with your files. Let me generate some code for you based on your requirements.";
        } else if (inputValue.toLowerCase().includes('deploy') || inputValue.toLowerCase().includes('publish')) {
          responseContent = "To deploy your project, you'll need to configure your deployment settings. Would you like me to help you set that up?";
        } else {
          responseContent = `I can help you with your "${projectContext}" project. What specific aspect would you like assistance with?`;
        }
      } else {
        responseContent = "I can help you with that. Would you like to start building a new project or work with an existing one?";
      }
      
      const assistantMessage: Message = {
        id: uuidv4(),
        content: responseContent,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Navigate if needed
      if (shouldNavigate) {
        setTimeout(() => {
          navigate(navigateTo);
        }, 1500);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full border border-zinc-200 rounded-lg overflow-hidden" style={{ height }}>
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user' 
                  ? 'bg-zinc-800 text-white' 
                  : 'bg-zinc-100 text-zinc-800'
              }`}
            >
              <p>{message.content}</p>
              <div 
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-zinc-300' : 'text-zinc-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 text-zinc-800 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t border-zinc-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={projectContext ? "Ask about this project..." : "Ask me anything..."}
            className="flex-1 border border-zinc-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className={`px-4 py-2 rounded-md ${
              !inputValue.trim() || isTyping
                ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            }`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
