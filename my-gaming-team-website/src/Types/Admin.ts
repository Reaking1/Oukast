export interface AdminData {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    dateOfBirth: string; // Optional timestamp
  }
  
  export interface UpdateAdminData {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    role?: string;
    dateOfBirth?: string; // Optional timestamp
  }
  