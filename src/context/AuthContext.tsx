import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  id: string;
  email: string;
  name: string;
  role: 'applicant' | 'reviewer' | 'admin' | 'superadmin';
  profileComplete: boolean;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  verifyMFA: (code: string) => Promise<void>;
  requiresMFA: boolean;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requiresMFA, setRequiresMFA] = useState(false);
  // Check if the user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to verify the token
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Mock user for demo purposes
          setUser({
            id: '1',
            email: 'user@example.com',
            name: 'John Doe',
            role: 'applicant',
            profileComplete: true
          });
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Mock successful login for demo purposes
      const mockUser = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'applicant' as const,
        profileComplete: true
      };
      // Simulate MFA requirement
      const requireMFA = true;
      if (requireMFA) {
        setRequiresMFA(true);
        localStorage.setItem('temp_email', email);
        return;
      }
      // If no MFA required, complete login
      localStorage.setItem('auth_token', 'mock_token');
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };
  const verifyMFA = async (code: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to verify the MFA code
      // Mock successful MFA verification
      const email = localStorage.getItem('temp_email');
      if (!email) throw new Error('Session expired');
      localStorage.removeItem('temp_email');
      localStorage.setItem('auth_token', 'mock_token');
      setUser({
        id: '1',
        email,
        name: 'John Doe',
        role: 'applicant',
        profileComplete: true
      });
      setRequiresMFA(false);
    } catch (error) {
      console.error('MFA verification failed:', error);
      throw new Error('Invalid MFA code');
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Mock successful registration
      localStorage.setItem('auth_token', 'mock_token');
      setUser({
        id: '1',
        email,
        name,
        role: 'applicant',
        profileComplete: false
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };
  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Mock successful password reset request
      return Promise.resolve();
    } catch (error) {
      console.error('Password reset request failed:', error);
      throw new Error('Password reset request failed');
    } finally {
      setIsLoading(false);
    }
  };
  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Mock successful password reset
      return Promise.resolve();
    } catch (error) {
      console.error('Password reset failed:', error);
      throw new Error('Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    verifyMFA,
    requiresMFA,
    forgotPassword,
    resetPassword
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};