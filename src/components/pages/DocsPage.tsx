import React, { useState } from 'react';
import Header from '../layout/Header';

interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const docSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Getting Started with Create</h2>
        <p className="mb-4">
          Welcome to Create! This guide will help you get started with our platform and build your first project.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Creating an Account</h3>
        <p className="mb-4">
          To get started with Create, you'll need to create an account. You can sign up using your email or Google account.
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Visit the <a href="/signup" className="text-blue-600 hover:underline">signup page</a></li>
          <li>Enter your email or click "Sign in with Google"</li>
          <li>Follow the instructions to complete your account setup</li>
        </ol>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Creating Your First Project</h3>
        <p className="mb-4">
          Once you've created an account, you can start building your first project:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Navigate to the Dashboard</li>
          <li>Click on "New Project" or go to the "Build" tab</li>
          <li>Choose a template or start from scratch</li>
          <li>Follow the guided setup process</li>
        </ol>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Using the AI Assistant</h3>
        <p className="mb-4">
          Our AI assistant can help you build your project faster:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Describe what you want to build in natural language</li>
          <li>The AI will generate code and components based on your description</li>
          <li>Review and edit the generated code as needed</li>
          <li>Ask the AI for help with specific features or issues</li>
        </ul>
      </div>
    )
  },
  {
    id: 'templates',
    title: 'Templates',
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Templates</h2>
        <p className="mb-4">
          Create offers a variety of templates to help you get started quickly. Each template is designed for a specific use case and comes with pre-built components and functionality.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Available Templates</h3>
        <div className="space-y-4 mb-6">
          <div className="border border-zinc-200 rounded-lg p-4">
            <h4 className="font-medium">Landing Page</h4>
            <p className="text-zinc-600">A modern landing page template with hero section and features</p>
          </div>
          
          <div className="border border-zinc-200 rounded-lg p-4">
            <h4 className="font-medium">Blog</h4>
            <p className="text-zinc-600">A complete blog platform with articles and categories</p>
          </div>
          
          <div className="border border-zinc-200 rounded-lg p-4">
            <h4 className="font-medium">E-commerce</h4>
            <p className="text-zinc-600">Online store with product catalog and checkout</p>
          </div>
          
          <div className="border border-zinc-200 rounded-lg p-4">
            <h4 className="font-medium">Dashboard</h4>
            <p className="text-zinc-600">Admin dashboard with analytics and user management</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Customizing Templates</h3>
        <p className="mb-4">
          All templates are fully customizable. You can:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Change colors, fonts, and layout</li>
          <li>Add or remove components</li>
          <li>Modify functionality</li>
          <li>Integrate with external services</li>
        </ul>
      </div>
    )
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>
        <p className="mb-4">
          The AI Assistant is a powerful tool that helps you build projects faster by generating code and providing guidance.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">How It Works</h3>
        <p className="mb-4">
          The AI Assistant uses natural language processing to understand your requirements and generate appropriate code and components.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Example Prompts</h3>
        <div className="bg-zinc-50 p-4 rounded-lg mb-6">
          <p className="font-medium mb-2">Creating a component:</p>
          <p className="text-zinc-700 italic">"Create a responsive navigation bar with a logo, links, and a mobile menu"</p>
        </div>
        
        <div className="bg-zinc-50 p-4 rounded-lg mb-6">
          <p className="font-medium mb-2">Styling elements:</p>
          <p className="text-zinc-700 italic">"Style the button to have rounded corners, a gradient background, and a hover effect"</p>
        </div>
        
        <div className="bg-zinc-50 p-4 rounded-lg mb-6">
          <p className="font-medium mb-2">Adding functionality:</p>
          <p className="text-zinc-700 italic">"Add form validation to the contact form that checks for valid email and required fields"</p>
        </div>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">AI Credits</h3>
        <p className="mb-4">
          AI interactions consume credits based on the complexity of the request:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Simple queries: 1 credit</li>
          <li>Component generation: 5-10 credits</li>
          <li>Page generation: 20-50 credits</li>
          <li>Complex application logic: 50-100 credits</li>
        </ul>
        <p>
          Different plans include different amounts of AI credits per month. See our <a href="/pricing" className="text-blue-600 hover:underline">pricing page</a> for details.
        </p>
      </div>
    )
  },
  {
    id: 'deployment',
    title: 'Deployment',
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Deployment</h2>
        <p className="mb-4">
          Create makes it easy to deploy your projects to the web with just a few clicks.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Deployment Options</h3>
        <p className="mb-4">
          You can deploy your projects in several ways:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>One-click deployment:</strong> Deploy directly to our hosting platform</li>
          <li><strong>Export code:</strong> Download your project and deploy it yourself</li>
          <li><strong>CI/CD integration:</strong> Connect to GitHub, GitLab, or Bitbucket (Pro and Enterprise plans)</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Custom Domains</h3>
        <p className="mb-4">
          Pro and Enterprise plans allow you to use custom domains for your projects:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Go to your project settings</li>
          <li>Click on "Custom Domain"</li>
          <li>Enter your domain name</li>
          <li>Follow the instructions to configure DNS settings</li>
        </ol>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Deployment Settings</h3>
        <p className="mb-4">
          You can configure various settings for your deployments:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Environment variables</li>
          <li>Build commands</li>
          <li>Preview deployments</li>
          <li>Rollback options</li>
        </ul>
      </div>
    )
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">API Reference</h2>
        <p className="mb-4">
          Create provides a RESTful API that allows you to programmatically interact with the platform.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Authentication</h3>
        <p className="mb-4">
          All API requests require authentication using an API key:
        </p>
        <pre className="bg-zinc-800 text-white p-4 rounded-lg mb-6 overflow-x-auto">
          {`curl -X GET https://api.create.xyz/v1/projects \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
        </pre>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Projects</h3>
        <p className="mb-4">
          Endpoints for managing projects:
        </p>
        <div className="space-y-4 mb-6">
          <div className="border border-zinc-200 rounded-lg p-4">
            <h4 className="font-medium">GET /v1/projects</h4>
            <p className="text-zinc-600">List all projects</p>
          </div>
          
          <div className="border border-zinc-200 rounded-lg p-4">
            <h4 className="font-medium">GET /v1/projects/:id</h4>
            <p className="text-zinc-600">Get a specific project</p>
          </div>
          
          <div className="border border-zinc-200 rounded-lg p-4">
            <h4 className="font-medium">POST /v1/projects</h4>
            <p className="text-zinc-600">Create a new project</p>
          </div>
          
          <div className="border border-zinc-200 rounded-lg p-4">
            <h4 className="font-medium">PUT /v1/projects/:id</h4>
            <p className="text-zinc-600">Update a project</p>
          </div>
          
          <div className="border border-zinc-200 rounded-lg p-4">
            <h4 className="font-medium">DELETE /v1/projects/:id</h4>
            <p className="text-zinc-600">Delete a project</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">AI Assistant</h3>
        <p className="mb-4">
          Endpoints for interacting with the AI Assistant:
        </p>
        <div className="space-y-4 mb-6">
          <div className="border border-zinc-200 rounded-lg p-4">
            <h4 className="font-medium">POST /v1/ai/generate</h4>
            <p className="text-zinc-600">Generate code based on a prompt</p>
          </div>
          
          <div className="border border-zinc-200 rounded-lg p-4">
            <h4 className="font-medium">POST /v1/ai/modify</h4>
            <p className="text-zinc-600">Modify existing code based on a prompt</p>
          </div>
        </div>
        
        <p className="mb-4">
          For full API documentation, please visit our <a href="#" className="text-blue-600 hover:underline">API Documentation Portal</a>.
        </p>
      </div>
    )
  }
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow pt-[46px] bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 mb-8 md:mb-0 md:mr-8">
              <div className="sticky top-[62px]">
                <h2 className="text-lg font-bold mb-4">Documentation</h2>
                <nav className="space-y-1">
                  {docSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md ${
                        activeSection === section.id
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
                
                <div className="mt-8 p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                  <h3 className="font-medium mb-2">Need help?</h3>
                  <p className="text-sm text-zinc-600 mb-4">
                    Can't find what you're looking for or have questions?
                  </p>
                  <button className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-700 transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="prose max-w-none">
                {docSections.find(section => section.id === activeSection)?.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
