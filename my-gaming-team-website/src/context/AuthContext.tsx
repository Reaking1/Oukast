import { AuthService } from '../services/auth';
import { Admin } from '../Types/Auth';
import { createContext, useState, useEffect, ReactNode } from 'react';

import { toast } from 'react-toastify';

interface AuthState {
  isAuthenticated: boolean;
  user: Admin | null;
  token: string;
}

interface AuthContextType extends AuthState {
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: "",
  });

  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      const {token, role} = await AuthService.login(email,password);
      const user = await AuthService.fetchCurrentAdmin();

      setAuthState({
        isAuthenticated: true,
        user,
        token,
      });

      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      console.log('Token saved:', localStorage.getItem('authToken'));


      toast.success("Logged in successfully!");
    } catch (error) {
    if(error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error("Login failed. Please try again.")
    }
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setAuthState({ isAuthenticated: false, user: null, token: ""});
    localStorage.removeItem("userRole");
    toast.info("logged out successfully.");
  };



  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem("authToken");
      const role = localStorage.getItem("userRole")
      if(token && role) {
        try {
         const user = await AuthService.fetchCurrentAdmin();
         setAuthState({isAuthenticated: true, user, token}) 
        } catch (error) {
          console.error("Failed to fetch user profile:", error)
        }
      }
    };
    loadUserFromToken();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

