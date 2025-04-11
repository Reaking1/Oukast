import { authService } from "@/services/auth";
import { Admin, LoginCredentials } from "@/Types/Auth";
import { useEffect, useState } from "react";



interface UseAuthReturn {
    currentAdmin: Admin | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

export const useAuth = (): UseAuthReturn => {
    const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);


    //called on mount
    useEffect(() => {
        const initialzie = async () => {
            const auth = authService.isAuthenticated();
            setIsAuthenticated(auth);

            if(auth) {
                try {
                    const admin = await authService.fetchCurrentAdmin();
                    setCurrentAdmin(admin);
                } catch (error) {
                    console.error("⚠️ Failed to fetch current admin");
                    authService.logout();
                    setCurrentAdmin(null);
                    setIsAuthenticated(false);
                }
            }

            setLoading(false)
        };
        initialzie();
    }, []);


    const login = async(crendtials: LoginCredentials) => {
        setLoading(true);
        try{
            await authService.login(crendtials.email, crendtials.password);
            const admin = await authService.fetchCurrentAdmin();
            setCurrentAdmin(admin);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("❌ Login failed:", error);
            throw error;
        } finally {
            setLoading(false)
        }
    };

    const logout = () => {
        authService.logout();
        setCurrentAdmin(null);
        setIsAuthenticated(false);
    };


    return {
        currentAdmin,
        isAuthenticated,
        login,
        logout,
        loading,
    }
}