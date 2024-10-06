import api from "./api";

interface LoginData {
    email: string;
    password: string;
}

interface SignupData {
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  password: string;
  role: string;
}


export const login = async (data: LoginData) => {
    const response = await api.post('/auth/login', data); // Adjust endpoint if necessary
    return response.data;
}

export const signup =async (data: SignupData) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
}

// Similarly, create functions for events and admin operations