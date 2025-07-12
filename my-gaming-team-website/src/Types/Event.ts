// Data coming from the backend
export interface EventData {
  _id: string;
  eventName: string;
  description: string;
  location: string;
  date: string;
  imageName: string; // ✅ This is a string (filename)
  createdBy?: string | { name?: string; email?: string }; // Updated
  status?: 'pending' | 'approved' | 'rejected';
  createdAt: string; // ✅ Added this line for event creation timestamp
} 

// Data used when creating a new event (includes file)
export interface CreateEventData {
  eventName: string;
  description: string;
  location: string;
  date: string;
  imageName: File | null; // ✅ File is uploaded here
  status?: 'pending' | 'approved' | 'rejected';
}

// Data used when updating an event (includes file)
export interface EventUpdateData {
  _id?: string;
  eventName?: string;
  description?: string;
  location?: string;
  date?: string;
  imageName?: File | null; // ✅ Same type as in creation
  status?: 'pending' | 'approved' | 'rejected';
}
