import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => void;
  loginWithDemo: (role: 'admin' | 'user') => void;
  logout: () => void;
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

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string) => {
    // In a real app, this would make an API call
    // For now, we'll just create a mock user
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: 'user' as const
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const loginWithDemo = (role: 'admin' | 'user') => {
    const demoUser = DEMO_USERS[role];
    setUser(demoUser);
    localStorage.setItem('user', JSON.stringify(demoUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading,
        login,
        loginWithDemo,
        logout
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
