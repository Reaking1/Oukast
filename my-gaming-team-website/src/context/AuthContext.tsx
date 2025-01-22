import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login, fetchUserProfile } from '../services/auth';
import { AuthContextType, AuthState, LoginPayload } from '../types/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: '',
  });

  const handleLogin = async ({ email, password }: LoginPayload) => {
    try {
      const { token } = await login({ email, password });
      const user = await fetchUserProfile(token);

      setAuthState({
        isAuthenticated: true,
        user,
        token,
      });

      localStorage.setItem('authToken', token);
      toast.success('Logged in successfully!');
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error(error?.message || 'Failed to login. Please try again.');
      throw error;
    }
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: '',
    });

    localStorage.removeItem('authToken');
    toast.info('Logged out successfully.');
  };

  const loadUserFromToken = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const user = await fetchUserProfile(token);
        setAuthState({
          isAuthenticated: true,
          user,
          token,
        });
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        handleLogout();
      }
    }
  };

  useEffect(() => {
    loadUserFromToken();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
