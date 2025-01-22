export interface AdminData {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
  }
  
  export interface UpdateAdminData {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    role?: string;
  }
  