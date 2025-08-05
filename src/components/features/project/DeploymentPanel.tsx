import React, { useState } from 'react';
import { Project } from '../../../context/ProjectContext';

interface DeploymentPanelProps {
  project: Project;
}

interface DeploymentEnvironment {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive' | 'deploying' | 'failed';
  lastDeployed: Date | null;
}

export default function DeploymentPanel({ project }: DeploymentPanelProps) {
  const [environments, setEnvironments] = useState<DeploymentEnvironment[]>([
    {
      id: 'dev',
      name: 'Development',
      url: `https://dev-${project.id.substring(0, 8)}.create.xyz`,
      status: 'inactive',
      lastDeployed: null
    },
    {
      id: 'staging',
      name: 'Staging',
      url: `https://staging-${project.id.substring(0, 8)}.create.xyz`,
      status: 'inactive',
      lastDeployed: null
    },
    {
      id: 'production',
      name: 'Production',
      url: `https://${project.id.substring(0, 8)}.create.xyz`,
      status: 'inactive',
      lastDeployed: null
    }
  ]);
  
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('dev');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentLog, setDeploymentLog] = useState<string[]>([]);
  
  const handleDeploy = () => {
    setIsDeploying(true);
    setDeploymentLog([]);
    
    // Update environment status
    setEnvironments(prevEnvs => 
      prevEnvs.map(env => 
        env.id === selectedEnvironment 
          ? { ...env, status: 'deploying' } 
          : env
      )
    );
    
    // Simulate deployment process with logs
    const logs = [
      'Initializing deployment...',
      'Preparing build environment...',
      'Installing dependencies...',
      'Building project...',
      'Optimizing assets...',
      'Running tests...',
      'Deploying to server...',
      'Finalizing deployment...',
      'Deployment successful!'
    ];
    
    logs.forEach((log, index) => {
      setTimeout(() => {
        setDeploymentLog(prevLogs => [...prevLogs, log]);
        
        // When deployment is complete
        if (index === logs.length - 1) {
          setIsDeploying(false);
          
          // Update environment status and last deployed date
          setEnvironments(prevEnvs => 
            prevEnvs.map(env => 
              env.id === selectedEnvironment 
                ? { ...env, status: 'active', lastDeployed: new Date() } 
                : env
            )
          );
        }
      }, (index + 1) * 1000);
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs rounded-full bg-zinc-100 text-zinc-800">Inactive</span>;
      case 'deploying':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Deploying</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Failed</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-6">
      <h2 className="text-xl font-medium mb-4">Deployment</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Environment
          </label>
          <select
            value={selectedEnvironment}
            onChange={(e) => setSelectedEnvironment(e.target.value)}
            className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            disabled={isDeploying}
          >
            {environments.map(env => (
              <option key={env.id} value={env.id}>
                {env.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Environment Details</h3>
            <div className="bg-zinc-50 rounded-md p-4 border border-zinc-200">
              {environments
                .filter(env => env.id === selectedEnvironment)
                .map(env => (
                  <div key={env.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-600">Status:</span>
                      {getStatusBadge(env.status)}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-600">URL:</span>
                      <a 
                        href={env.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {env.url}
                      </a>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-600">Last Deployed:</span>
                      <span>{env.lastDeployed ? env.lastDeployed.toLocaleString() : 'Never'}</span>
                    </div>
                  </div>
                ))}
            </div>
            
            <div className="mt-4">
              <button
                onClick={handleDeploy}
                disabled={isDeploying}
                className={`w-full px-4 py-2 rounded-md text-white ${
                  isDeploying
                    ? 'bg-zinc-400 cursor-not-allowed'
                    : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
              >
                {isDeploying ? 'Deploying...' : 'Deploy'}
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Deployment Logs</h3>
            <div className="bg-zinc-900 text-zinc-100 rounded-md p-4 h-[200px] overflow-y-auto font-mono text-sm">
              {deploymentLog.length === 0 ? (
                <div className="text-zinc-500">No deployment logs yet. Deploy to see logs.</div>
              ) : (
                <div className="space-y-1">
                  {deploymentLog.map((log, index) => (
                    <div key={index} className="flex">
                      <span className="text-zinc-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
