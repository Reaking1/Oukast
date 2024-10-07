// src/services/auth.ts

import api from './api';
import { Admin, LoginResponse } from '../types';

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

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};

export const signup = async (data: SignupData): Promise<Admin> => {
  const response = await api.post<Admin>('/auth/signup', data);
  return response.data;
};
