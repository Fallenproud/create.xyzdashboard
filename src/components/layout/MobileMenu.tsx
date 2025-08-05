import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navigationItems, dashboardNavigationItems, buildNavigationItems } from '../../data/navigation';
import { useAuth } from '../../context/AuthContext';

interface MobileMenuProps {
  isDashboard?: boolean;
  isBuild?: boolean;
}

export default function MobileMenu({ isDashboard = false, isBuild = false }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="items-center box-border flex h-[30px] relative">
      <div className="box-border block min-h-[auto] min-w-[auto] md:hidden md:min-h-0 md:min-w-0">
        <button type="button" className="box-border" onClick={toggleMenu}>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="box-border shrink-0 h-6 w-6">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <img src="https://c.animaapp.com/mdxy25kuCt1VfJ/assets/icon-2.svg" alt="Icon" className="box-border shrink-0 h-6 w-6" />
          )}
        </button>
      </div>
      
      {isOpen && (
        <div className="absolute top-[46px] right-0 bg-white shadow-lg rounded-lg w-[200px] z-20 mt-2">
          <div className="py-2">
            {items.map((item) => (
              <Link 
                key={item.id} 
                to={item.href} 
                className="block px-4 py-2 text-neutral-700 hover:bg-zinc-100"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <button 
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-zinc-100"
              >
                Sign out
              </button>
            ) : (
              <Link 
                to="/signup" 
                className="block px-4 py-2 text-zinc-900 font-medium hover:bg-zinc-100"
                onClick={() => setIsOpen(false)}
              >
                Get started
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
