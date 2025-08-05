import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useProjects } from '../../context/ProjectContext';

// Define breadcrumb mapping based on URL patterns
const getBreadcrumbLabel = (path: string, params: Record<string, string>, projectName?: string, fileName?: string) => {
  // Special cases with dynamic values
  if (path.includes(':projectId')) {
    if (path.includes('files/:fileId')) {
      return `File: ${fileName || 'Unknown'}`;
    }
    if (path.includes('workflows/:workflowId')) {
      return `Workflow: ${params.workflowName || 'Unknown'}`;
    }
    if (path === '/build/:projectId') {
      return projectName || 'Project Overview';
    }
  }

  // Static mappings
  const breadcrumbMap: Record<string, string> = {
    '': 'Home',
    'dashboard': 'Dashboard',
    'build': 'Build Dashboard',
    'build/new': 'New Project',
    'projects': 'Projects',
    'settings': 'Settings',
    'edit': 'Edit Project',
    'settings/api': 'API Keys',
    'settings/access': 'Access Control',
    'files': 'File Explorer',
    'ai': 'AI Assistant',
    'ai/history': 'Assistant History',
    'ai/prompts': 'Custom Prompts',
    'workflows': 'Workflows',
    'workflows/new': 'New Workflow',
    'integrations': 'Integrations',
    'login': 'Login',
    'signup': 'Register',
    'register': 'Register',
    'profile': 'My Profile',
    'notifications': 'Notifications',
    'docs': 'Documentation',
    'support': 'Support',
    'pricing': 'Pricing'
  };

  return breadcrumbMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
};

export default function Breadcrumbs() {
  const location = useLocation();
  const params = useParams();
  const { getProjectById } = useProjects();
  
  // Extract path segments
  const pathSegments = location.pathname.split('/').filter(x => x);
  
  // Don't show breadcrumbs on the root path
  if (pathSegments.length === 0) {
    return null;
  }

  // Get project name if we're in a project context
  const projectIdIndex = pathSegments.indexOf('build') !== -1 ? 
    pathSegments.indexOf('build') + 1 : -1;
  
  let projectName;
  let fileName;
  
  if (projectIdIndex !== -1 && projectIdIndex < pathSegments.length) {
    const projectId = pathSegments[projectIdIndex];
    const project = getProjectById(projectId);
    projectName = project?.name;
    
    // Get file name if we're in a file context
    const fileIdIndex = pathSegments.indexOf('files') !== -1 ?
      pathSegments.indexOf('files') + 1 : -1;
    
    if (fileIdIndex !== -1 && fileIdIndex < pathSegments.length) {
      // In a real app, you'd fetch the file name from a file service
      fileName = `file-${pathSegments[fileIdIndex]}.js`;
    }
  }
  
  // Build breadcrumb items
  const breadcrumbItems = [];
  
  // Always add Home
  breadcrumbItems.push({
    label: 'Home',
    path: '/',
    isLast: pathSegments.length === 0
  });
  
  // Add intermediate paths
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    // Skip adding breadcrumb for projectId itself, but keep the path
    if (index === projectIdIndex && projectName) {
      breadcrumbItems.push({
        label: projectName,
        path: currentPath,
        isLast
      });
    } else {
      // For other segments, use the mapping
      const pathForLabel = pathSegments.slice(0, index + 1).join('/');
      const label = getBreadcrumbLabel(pathForLabel, params, projectName, fileName);
      
      breadcrumbItems.push({
        label,
        path: currentPath,
        isLast
      });
    }
  });
  
  return (
    <nav className="text-sm" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex flex-wrap">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.isLast ? (
              <span className="text-zinc-900 font-medium truncate max-w-[150px] md:max-w-xs">
                {item.label}
              </span>
            ) : (
              <>
                <Link 
                  to={item.path} 
                  className="text-zinc-500 hover:text-zinc-700 truncate max-w-[100px] md:max-w-xs"
                >
                  {item.label}
                </Link>
                <svg 
                  className="flex-shrink-0 fill-current w-3 h-3 mx-2" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 320 512"
                >
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
