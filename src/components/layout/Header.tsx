import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Determine the current context
  const isDashboard = location.pathname.includes('/dashboard');
  const isBuild = location.pathname.includes('/build');
  
  // Determine where the logo should link to
  const logoLink = isAuthenticated ? 
    (isBuild ? '/build' : '/dashboard') : 
    '/';

  return (
    <header className="fixed bg-white box-border w-full border-gray-200 border-b border-solid z-10">
      <div className="items-center box-border flex h-[46px] justify-between max-w-none w-auto mx-0 px-5 md:max-w-[1232px] md:w-full md:mx-auto md:px-0">
        <div className="items-center box-border flex h-[30px] w-full">
          <Link aria-label="Home" to={logoLink} className="items-center box-border flex mr-12">
            <img src="https://c.animaapp.com/mdxy25kuCt1VfJ/assets/icon-1.svg" alt="Icon" className="box-border shrink-0 h-5 w-[81px]" />
          </Link>
          <Navigation isDashboard={isDashboard} isBuild={isBuild} />
        </div>
        <MobileMenu isDashboard={isDashboard} isBuild={isBuild} />
      </div>
    </header>
  );
}
