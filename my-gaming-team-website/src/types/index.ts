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

export interface Event {
  id: string;
  name: string;
  date: Date | string;
  description: string;
  image?: string;
  location: string;
  // URL to the logo image
  // Add other relevant fields
}

export interface LoginResponse {
  token: string;
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
