// For creating a new admin (frontend → backend)
export interface AdminData {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: 'admin' | 'super-admin'; // Optional: restrict roles
  dateOfBirth: Date; // You can change to string if needed
}

// For full admin info from backend → frontend
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

// For updating existing admin info (frontend → backend)
export interface UpdateAdminData {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  role?: string;
  dateOfBirth?: string;
  isApproved?: boolean;
}
