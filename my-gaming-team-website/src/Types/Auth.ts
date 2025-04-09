export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface Admin {
    _id: string; // <-- This matches the backend!
    name: string;
    surname: string;
    email: string;
    role: string;
    dateOfBirth: string;
    isApproved: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  