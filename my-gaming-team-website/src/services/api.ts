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
  login: async (credentials: LoginCredentials) => {
    console.log("🟠 [AuthAPI.login] Sending login request", credentials);
    try {
      const response = await api.post<{token: string; admin: Admin}>('/auth/login', credentials);
      console.log("✅ [AuthAPI.login] Login successful. Response:", response.data);
      return response;
    } catch (error) {
      console.error("❌ [AuthAPI.login] Login failed:", error);
      throw error;
    }
  },
    

  logout: () => {
    localStorage.removeItem('authToken'); // Clear Token\
    return Promise.resolve();
  },
  fetchCurrentAdmin: async () => {
    //First, try fetching from /admins
    try {
      const response = await api.get<Admin>('/admins/me');
      return response.data;
    } catch (error) {
      try {
        //If the first request fails, try fecthing from /super-admins
        const response = await api.get<Admin>('/super-admins/me');
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch current admin')
      }
    }
  }, // Fetch details of logged-in admin

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

export async function approveAdmin(adminId: string, token: string) {
  const response = await fetch(`${BASE_URL}/admin/approve/${adminId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Ensure super-admin is authenticated
    },
  });

  if (!response.ok) {
    throw new Error('Failed to approve admin');
  }

  return response.json();
}



export default api