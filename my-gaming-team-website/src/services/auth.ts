// src/services/auth.ts

import { AuthAPI } from "./api"


export const AuthService = {
  /**
   * Logs in the admin and stores the token in localStorage.
   * @param email - Admin's email address.
   * @param password - Admin's password.
   */

  login: async (email: string, password: string): Promise <void> => {
    try {
      const response = await AuthAPI.login({ email, password});
      const {token} = response.data;

      //Save the token in localStorage
      localStorage.setItem('authToken', token);
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

    fetchCurrentAdmin: async (): Promise<any> => {
      try {
        const response = await AuthAPI.fetchCurrentAdmin();
        return response.data;
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
    return !!token; // Returns true if token exists
  },



}