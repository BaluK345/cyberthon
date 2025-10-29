import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on app start
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (userData: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    try {
      await authAPI.register(userData);
      // Registration successful, OTP sent
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      await authAPI.verifyOTP({ email, otp });
      // OTP verification successful, user is now registered
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'OTP verification failed');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      
      // Store tokens and user data
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
      
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    verifyOTP,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};