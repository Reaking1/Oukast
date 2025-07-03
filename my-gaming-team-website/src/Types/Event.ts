export interface EventData {
    _id: string;
  eventName: string;
  description: string;
  location: string;
  date: string;
  imageName?: string;
  createdBy?: string;
  status?: 'pending' | 'approved' | 'rejected';
  }
  
  export interface CreateEventData {
    eventName: string;
    description: string;
    location: string;
    date: string;
    imageName?: File | null; // Optional file property
     status?: 'pending' | 'approved' | 'rejected';
  }
  
  export interface EventUpdateData {
    eventName?: string;
  description?: string;
  date?: string;
  location?: string;
  imageName?: File | null;
  status?: 'pending' | 'approved' | 'rejected';
  }