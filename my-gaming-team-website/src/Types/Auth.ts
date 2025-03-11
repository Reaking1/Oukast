export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface Admin {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
    dateOfBirth: string; // Optional timestamp
  }
  