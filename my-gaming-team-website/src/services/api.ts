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
    const token = localStorage.getItem('authToken'); //Retrieve token from localStorage
    if(token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//Auth API endpoints
export const AuthAPI = {
  login: (credentials: LoginCredentials) => 
    api.post<{token: string; admin: Admin}>('/auth/login', credentials),
  logout: () => {
    localStorage.removeItem('authToken'); // Clear Token
    return Promise.resolve();
  },
  fetchCurrentAdmin: () => api.get<Admin>('/auth/me'), // Fetch details of logged-in admin

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


export default api