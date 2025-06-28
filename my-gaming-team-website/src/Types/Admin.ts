export interface AdminData {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    dateOfBirth: Date; // Optional timestamp
  }
// For full admin data (backend -> frontend)
export interface FullAdmin {
  _id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  dateOfBirth: string;
  isApproved: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// For updating an existing admin
export interface UpdateAdminData {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  role?: string;
  dateOfBirth?: string;
  isApproved?: boolean;
} 