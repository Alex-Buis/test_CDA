import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - dans un vrai projet, cela serait un appel API
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock registration
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'client'
    };
    setUser(newUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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
