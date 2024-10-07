// src/types/index.ts

export interface Admin {
  _id: string;
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string; // ISO string format
  role: 'admin' | 'super-admin';
  __v?: number;
}

export interface LoginResponse {
  access_token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  password: string;
  role: 'admin' | 'super-admin';
}
