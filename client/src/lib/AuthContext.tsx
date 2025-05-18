import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './mockData';
import { getCurrentUser, login as apiLogin, logout as apiLogout, register as apiRegister } from './api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, firstName: string, lastName: string, password: string, phoneNumber?: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const { data, error } = await getCurrentUser();
        if (data) {
          setUser(data);
        } else if (error !== 'Not authenticated') {
          setError(error || 'Error fetching user');
        }
      } catch (e) {
        setError('Failed to load user');
      } finally {
        setLoading(false);
      }
    }
    
    loadUser();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await apiLogin(username, password);
      if (data) {
        setUser(data);
        return true;
      } else {
        setError(error || 'Login failed');
        return false;
      }
    } catch (e) {
      setError('Failed to login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username: string, 
    email: string, 
    firstName: string, 
    lastName: string, 
    password: string, 
    phoneNumber?: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await apiRegister(username, email, firstName, lastName, password, phoneNumber);
      if (data) {
        setUser(data);
        return true;
      } else {
        setError(error || 'Registration failed');
        return false;
      }
    } catch (e) {
      setError('Failed to register');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await apiLogout();
      if (!error) {
        setUser(null);
        return true;
      } else {
        setError(error);
        return false;
      }
    } catch (e) {
      setError('Failed to logout');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}