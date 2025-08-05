import React from 'react';
import { Link } from 'react-router-dom';
import { navigationItems, dashboardNavigationItems, buildNavigationItems } from '../../data/navigation';
import { useAuth } from '../../context/AuthContext';

interface NavigationProps {
  isDashboard?: boolean;
  isBuild?: boolean;
}

export default function Navigation({ isDashboard = false, isBuild = false }: NavigationProps) {
  const { isAuthenticated, logout } = useAuth();
  
  // Determine which navigation items to show
  let items = navigationItems;
  
  if (isAuthenticated) {
    if (isDashboard) {
      items = dashboardNavigationItems;
    } else if (isBuild) {
      items = buildNavigationItems;
    }
  }

  return (
    <div className="items-center box-border gap-x-5 hidden justify-end min-h-0 min-w-0 gap-y-5 w-full md:flex md:min-h-[auto] md:min-w-[auto]">
      {items.map((item) => (
        <Link 
          key={item.id} 
          to={item.href} 
          className="text-neutral-700 dark:text-neutral-300 items-center box-border inline-flex min-h-0 min-w-0 md:flex md:min-h-[auto] md:min-w-[auto]"
        >
          <span className="text-sm box-border block leading-[21px] min-h-0 min-w-0 font-inter md:min-h-[auto] md:min-w-[auto]">
            {item.label}
          </span>
        </Link>
      ))}
      
      {isAuthenticated ? (
        <button 
          onClick={logout}
          className="text-white text-base items-center bg-zinc-900 dark:bg-zinc-700 box-border gap-x-1 flex justify-center leading-[22.4px] min-h-0 min-w-0 outline-transparent outline-offset-2 outline outline-2 gap-y-1 border px-2 py-1 rounded-lg border-solid border-transparent md:text-sm md:leading-[19.6px] md:min-h-[auto] md:min-w-[auto]"
        >
          Sign out
        </button>
      ) : (
        <Link 
          to="/signup" 
          className="text-white text-base items-center bg-zinc-900 dark:bg-zinc-700 box-border gap-x-1 flex justify-center leading-[22.4px] min-h-0 min-w-0 outline-transparent outline-offset-2 outline outline-2 gap-y-1 border px-2 py-1 rounded-lg border-solid border-transparent md:text-sm md:leading-[19.6px] md:min-h-[auto] md:min-w-[auto]"
        >
          Get started
        </Link>
      )}
    </div>
  );
}
