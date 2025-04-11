import { Admin, LoginCredentials } from "@/Types/Auth";
import { AuthAPI } from "./api";





export const authService = {
  /**
   * Logs in the admin and stores the token in localStorage.
   * @param email - Admin's email address.
   * @param password - Admin's password.
   */

  login: async (email: string, password: string): Promise<{token: string, admin: Admin}> => {
    try {
      const credentials: LoginCredentials = {email,password};
      const response = await AuthAPI.login(credentials);
      const {token,admin} = response.data;
      
      if(!admin || !admin.role || !token) {
        throw new Error("Invalid login response from server.")
      }

         // Save token & role to localStorage
         localStorage.setItem("authToken", token);
         localStorage.setItem("userRole", admin.role);

         return {token, admin}
    } catch (error) {
      console.error("🔴 Login failed:", error);
      throw new Error("Invalid credentials or server error.");
    }
  },

   /**
   * Logs out the user by clearing localStorage.
   */

   logout: (): void => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      console.log("🟢 User logged out.")
    } catch (error) {
      console.error("🔴 Logout failed:", error);
    }
   },



   fetchCurrentAdmin: async (): Promise<Admin> => {
    const token = localStorage.getItem("authToken");

    if(!token) {
      throw new Error("No auth token found");
    }


    try {
      return await AuthAPI.fetchCurrentAdmin()
    } catch (adminError) {
      console.warn("Admin profile fetch failed. Trying super admin route...")
    }

    try {
     return await AuthAPI.fetchSuperAdmin()
    } catch (superAdminError) {
      console.error("Super admin profile fetch failed:", superAdminError);
      throw new Error("Failed to fetch current admin profile")
    }
   },

/**
   * Checks if the user is authenticated.
   * @returns true if a valid token and role exist
   */

isAuthenticated: (): boolean => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");


  return Boolean(token && role);
}

}