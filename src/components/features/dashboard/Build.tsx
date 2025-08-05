import React, { useState } from 'react';
import ChatInterface from '../ChatInterface';

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

const templates: Template[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'A modern landing page template with hero section and features',
    image: 'https://c.animaapp.com/mdxy25kuCt1VfJ/assets/template-landing.svg',
    category: 'website'
  },
  {
    id: 'blog',
    name: 'Blog',
    description: 'A complete blog platform with articles and categories',
    image: 'https://c.animaapp.com/mdxy25kuCt1VfJ/assets/template-blog.svg',
    category: 'website'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online store with product catalog and checkout',
    image: 'https://c.animaapp.com/mdxy25kuCt1VfJ/assets/template-ecommerce.svg',
    category: 'website'
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Admin dashboard with analytics and user management',
    image: 'https://c.animaapp.com/mdxy25kuCt1VfJ/assets/template-dashboard.svg',
    category: 'app'
  },
  {
    id: 'mobile-app',
    name: 'Mobile App',
    description: 'React Native mobile app template with navigation',
    image: 'https://c.animaapp.com/mdxy25kuCt1VfJ/assets/template-mobile.svg',
    category: 'app'
  },
  {
    id: 'blank',
    name: 'Blank Project',
    description: 'Start from scratch with a blank project',
    image: 'https://c.animaapp.com/mdxy25kuCt1VfJ/assets/template-blank.svg',
    category: 'other'
  }
];

export default function Build() {
  const [activeTab, setActiveTab] = useState<'templates' | 'ai'>('templates');
  const [filter, setFilter] = useState<'all' | 'website' | 'app' | 'other'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(template => {
    // Apply category filter
    if (filter !== 'all' && template.category !== filter) {
      return false;
    }
    
    // Apply search filter
    if (searchQuery && !template.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Build Your Project</h1>
      </div>
      
      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden mb-6">
        <div className="flex border-b border-zinc-200">
          <button 
            className={`px-6 py-3 ${activeTab === 'templates' ? 'border-b-2 border-zinc-800 font-medium' : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            Templates
          </button>
          <button 
            className={`px-6 py-3 ${activeTab === 'ai' ? 'border-b-2 border-zinc-800 font-medium' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            AI Assistant
          </button>
        </div>
        
        {activeTab === 'templates' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
              <div className="flex space-x-2">
                <button 
                  className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-800'}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`px-3 py-1 rounded-md ${filter === 'website' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-800'}`}
                  onClick={() => setFilter('website')}
                >
                  Websites
                </button>
                <button 
                  className={`px-3 py-1 rounded-md ${filter === 'app' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-800'}`}
                  onClick={() => setFilter('app')}
                >
                  Apps
                </button>
                <button 
                  className={`px-3 py-1 rounded-md ${filter === 'other' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-800'}`}
                  onClick={() => setFilter('other')}
                >
                  Other
                </button>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-zinc-300 rounded-md pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-zinc-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map(template => (
                <div 
                  key={template.id} 
                  className="border border-zinc-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="h-40 bg-zinc-100 flex items-center justify-center">
                    <img 
                      src={template.image} 
                      alt={template.name} 
                      className="h-32 w-32 object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">{template.name}</h3>
                    <p className="text-sm text-zinc-600">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-zinc-500">No templates found matching your criteria.</p>
                <button 
                  className="mt-4 text-zinc-800 underline"
                  onClick={() => {
                    setFilter('all');
                    setSearchQuery('');
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'ai' && (
          <div className="p-6">
            <h2 className="text-xl font-medium mb-4">Build with AI</h2>
            <p className="text-zinc-600 mb-6">
              Describe what you want to build, and our AI assistant will help you create it.
            </p>
            
            <ChatInterface />
          </div>
        )}
      </div>
    </div>
  );
}
