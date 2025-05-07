/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminData, UpdateAdminData } from "../Types/Admin";
import { Admin, LoginCredentials } from "../Types/Auth";
import { EventData, CreateEventData, EventUpdateData } from "../Types/Event";
import axios from "axios"

const BASE_URL ='http://localhost:5000';


//Axios instance with defualt settings
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


//Attach token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); 
    console.log("Stored Token:", localStorage.getItem("authToken"));
//Retrieve token from localStorage
    if(token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//Auth API endpoints
export const AuthAPI = {


  /**
   * Logs in the admin
   */
  login: async (credentials: LoginCredentials) => {
    console.log("🟠 [AuthAPI.login] Sending login request", credentials);
    try {
      const response = await api.post<{accessToken: string; user: Admin}>('/auth/login', credentials);
      const {accessToken} = response.data;

      if(!accessToken) throw new Error("Ivaild login response from server");

       // 🔥 Store token
       localStorage.setItem('authToken', accessToken);
      console.log("✅ [AuthAPI.login] Login successful. Response:", response.data);
      return response;
    } catch (error) {
      console.error("❌ [AuthAPI.login] Login failed:", error);
      throw error;
    }
  },
    
   /**
   * Logs out the admin
   */

  logout: () => {
    localStorage.removeItem('authToken'); // Clear Token\
    return Promise.resolve();
  },

  /**
   * Fetches the currently logged-in regular admin's profile
   */
  fetchCurrentAdmin: async () => {
    //First, try fetching from /admins
    try {
      const response = await api.get<Admin>('/admins/me');
      return response.data;
    } catch (error) {
    console.error("❌ [AuthAPI.fetchCurrentAdmin] Error:", error);
    throw error;
    }
  },

   /**
   * Fetches the currently logged-in super admin's profile
   */

   fetchSuperAdmin: async () => {
    try {
      const response = await api.get<Admin>("/admins/super-admins/me");
      return response.data
    } catch (error) {
      console.error("❌ [AuthAPI.fetchSuperAdmin] Error:", error);
      throw error;
    }
   }




};


//Event Api endpoints
export const EventAPI = {
  getAllEvents: () => api.get<EventData[]>('/events'),
  createEvent: (eventData: CreateEventData ) =>
    api.post<EventData>('/events', eventData, {
      headers: { 'Content-Type': 'multipart/form-data'}, //For uploading files
    }),

    updateEvent: (id: string, eventData: EventUpdateData) => 
      api.put<EventData>(`/events/${id}`, eventData, {
        headers: {'Content-Type': 'multipart/form-data'},
      }),
      deleteEvent:(id: string) => api.delete<void>(`/events/${id}`),
};


//Admins API endpoints
export const AdminAPI = {
  getAllAdmins: () => api.get<Admin[]>('/admins'),
  createAdmin: (adminData: AdminData) => api.post<Admin>('/admins', adminData),
  updateAdmin: (id: string, adminData: UpdateAdminData) => api.put<Admin>(`/admins/${id}`, adminData),
  deleteAdmin: (id: string) => api.delete<void>(`/admins/${id}`),
};

export async function approveAdmin(adminId: string) {
 const response = await api.patch(`admins/approve/${adminId}`)

  return response
}



export default api