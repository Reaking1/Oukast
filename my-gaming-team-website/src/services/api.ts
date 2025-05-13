/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminData, UpdateAdminData } from "../Types/Admin";
import { Admin, LoginCredentials } from "../Types/Auth";
import { EventData, CreateEventData, EventUpdateData } from "../Types/Event";
import axios from "axios"

const BASE_URL ='http://localhost:5000';


//Axios instance with defualt settings
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


//Attach token to every request if available

axiosInstance.interceptors.request.use(
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
      const response = await axiosInstance.post<{accessToken: string; user: Admin}>('/auth/login', credentials);
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
    const token = localStorage.getItem("authToken");
    try {
      const response = await axiosInstance.get<Admin>("/admins/me", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
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
    const token = localStorage.getItem("authToken");
    try {
      const response = await axiosInstance.get<Admin>("/admins/super-admins/me", {
           headers: {
            Authorization: `Bearer ${token}`,
           },
      });
      return response.data
    } catch (error) {
      console.error("❌ [AuthAPI.fetchSuperAdmin] Error:", error);
    throw error;
    }
   }




};


//Event Api endpoints
export const EventAPI = {
  getAllEvents: () => axiosInstance.get<EventData[]>('/events'),
  createEvent: (eventData: CreateEventData ) =>
    axiosInstance.post<EventData>('/events', eventData, {
      headers: { 'Content-Type': 'multipart/form-data'}, //For uploading files
    }),

    updateEvent: (id: string, eventData: EventUpdateData) => 
      axiosInstance.put<EventData>(`/events/${id}`, eventData, {
        headers: {'Content-Type': 'multipart/form-data'},
      }),
      deleteEvent:(id: string) => axiosInstance.delete<void>(`/events/${id}`),
};


//Admins API endpoints
export const AdminAPI = {
  getAllAdmins: () =>axiosInstance.get<Admin[]>('/admins'),
  createAdmin: (adminData: AdminData) =>axiosInstance.post<Admin>('/admins', adminData),
  updateAdmin: (id: string, adminData: UpdateAdminData) => axiosInstance.put<Admin>(`/admins/${id}`, adminData),
  deleteAdmin: (id: string) =>axiosInstance.delete<void>(`/admins/${id}`),
};

export async function approveAdmin(adminId: string) {
 const response = await axiosInstance.patch(`admins/approve/${adminId}`)

  return response
}

//const API = {
 // AuthAPI,
 // EventAPI,
 // AdminAPI,
  //approveAdmin
//}



export default axiosInstance