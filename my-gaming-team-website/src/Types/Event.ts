export interface EventData {
    id: string;
    name: string;
    description: string;
    location: string;
    date: string;
    image?: File; // Optional file property
  }
  
  export interface CreateEventData {
    name: string;
    description: string;
    location: string;
    date: string;
    image?: File | null; // Optional file property
  }
  
  export interface EventUpdateData {
    id: string;
    name?: string; // All fields optional for partial updates
    description?: string;
    date?: string;
    location?: string;
    image?: File | null;
  }