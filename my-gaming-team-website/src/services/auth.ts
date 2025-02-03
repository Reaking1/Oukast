// src/services/auth.ts

import { Admin, LoginCredentials } from "@/Types/Auth";
import { AuthAPI } from "./api"


export const AuthService = {
  /**
   * Logs in the admin and stores the token in localStorage.
   * @param email - Admin's email address.
   * @param password - Admin's password.
   */

  login: async (email: string, password: string): Promise<string> => {
    try {
      const credentials: LoginCredentials = {email,password};
      const response = await AuthAPI.login(credentials);
      const {token} = response.data;

      //Save the token in localStorage
      localStorage.setItem('authToken', token);

      return token;
      
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Invaild credentials or server error')
    }
  },

    /**
   * Logs out the admin and clears the token.
   */

  logout: (): void => {
    try {
      AuthAPI.logout();
      localStorage.removeItem('authToken'); //Remove token from storage
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

    /**
   * Fetches the currently logged-in admin's details.
   * @returns Admin details object.
   */

    fetchCurrentAdmin: async (): Promise<Admin> => {
      try {
        const response = await AuthAPI.fetchCurrentAdmin();
        return response.data as Admin;
      } catch (error) {
        console.error('Fetching admin details failed:', error);
        throw new Error('Unable to fetch admin details.')
      }
    },

  /**
   * Checks if the admin is authenticated.
   * @returns True if authenticated, false otherwise.
   */

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('authToken');
    return Boolean(token); // Returns true if token exists
  },



}