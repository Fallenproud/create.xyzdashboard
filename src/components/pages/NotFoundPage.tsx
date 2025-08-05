import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow pt-[46px] flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-6xl font-bold text-zinc-800 mb-4">404</h1>
          <h2 className="text-2xl font-medium text-zinc-700 mb-6">Page Not Found</h2>
          <p className="text-zinc-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="bg-zinc-800 text-white px-6 py-3 rounded-md hover:bg-zinc-700 transition-colors"
            >
              Go Home
            </Link>
            <Link 
              to="/dashboard"
              className="bg-zinc-100 text-zinc-800 px-6 py-3 rounded-md hover:bg-zinc-200 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
