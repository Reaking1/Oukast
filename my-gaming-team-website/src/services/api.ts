/* eslint-disable @typescript-eslint/no-explicit-any */
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
  login: (credentials: {email: string; password: string}) => 
    api.post('/auth/login', credentials),
  logout: () => {
    localStorage.removeItem('authToken'); // Clear Token
    return Promise.resolve();
  },
  fetchCurrentAdmin: () => api.get('/auth/me'), // Fetch details of logged-in admin

};


//Event Api endpoints
export const EventAPI = {
  getAllEvents: () => api.get('/events'),
  createEvent: (eventData: FormData) =>
    api.post('/events', eventData, {
      headers: { 'Content-Type': 'multipart/form-data'}, //For uploading files
    }),

    updateEvent: (id: string, eventData: FormData) => 
      api.put(`/events/${id}`, eventData, {
        headers: {'Content-Type': 'multipart/form-data'},
      }),
      deleteEvent:(id: string) => api.delete(`/events/${id}`),
};


//Admins API endpoints
export const AdminAPI = {
  getAllAdmins: () => api.get('/admins'),
  createAdmin: (adminData: {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
  }) => api.post('/admins', adminData),
  updateAdmin: (id: string, adminData: any) => api.put(`/admins/${id}`, adminData),
  deleteAdmin: (id: string) => api.delete(`/admins/${id}`),
};


export default api