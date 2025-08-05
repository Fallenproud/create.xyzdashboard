import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  token?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithMagicLink: (email: string) => Promise<void>;
  loginWithOAuth: (provider: 'google' | 'github') => Promise<void>;
  loginWithDemo: (role: 'admin' | 'user') => void;
  logout: () => Promise<void>;
  clearError: () => void;
}

// Demo users for development
const DEMO_USERS = {
  admin: {
    id: 'admin-1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin' as const
  },
  user: {
    id: 'user-1',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user' as const
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticatedUser = await authAPI.checkAuth();
        setUser(authenticatedUser);
      } catch (err) {
        console.error('Auth check failed:', err);
        setError('Authentication check failed');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const authenticatedUser = await authAPI.login(email, password);
      setUser(authenticatedUser);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithMagicLink = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authAPI.requestMagicLink(email);
      // In a real app, the user would click the link in their email
      // and be redirected back to the app with a token
      // For now, we'll just show a success message
    } catch (err) {
      console.error('Magic link request failed:', err);
      setError('Failed to send magic link');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithOAuth = useCallback(async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const authenticatedUser = await authAPI.loginWithOAuth(provider);
      setUser(authenticatedUser);
    } catch (err) {
      console.error(`${provider} login failed:`, err);
      setError(`${provider} login failed`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithDemo = useCallback((role: 'admin' | 'user') => {
    const demoUser = DEMO_USERS[role];
    setUser(demoUser);
    localStorage.setItem('user', JSON.stringify(demoUser));
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await authAPI.logout();
      setUser(null);
      localStorage.removeItem('user');
    } catch (err) {
      console.error('Logout failed:', err);
      setError('Logout failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading,
        error,
        login,
        loginWithMagicLink,
        loginWithOAuth,
        loginWithDemo,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
