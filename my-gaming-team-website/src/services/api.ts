import axios from 'axios';

const API_URl = 'http://localhost:5000';


const api = axios.create({
    baseURL: API_URl
});


// Interceptor to attach token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },

    (error) => Promise.reject(error)

);


export default api;