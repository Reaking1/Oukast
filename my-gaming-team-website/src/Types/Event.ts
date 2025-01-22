export interface Event {
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
    image?: File; // Optional file property
  }
  
  export interface EventUpdateData {
    name?: string; // All fields optional for partial updates
    description?: string;
    date?: string;
    location?: string;
    image?: File;
  }