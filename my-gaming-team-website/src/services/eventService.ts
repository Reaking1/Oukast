// src/services/eventService.ts

import { AuthAPI } from "./api"


export const EventService = {
   /**
   * Fetches all events from the backend.
   * @returns A list of events.
   */

   fetchEvents: async (): Promise<any[]> => {
    try {
      const response = await AuthAPI.get('/events');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch events', error);
      throw new Error('Unable to fethc events.')
    }
   },

   
 /**
   * Creates a new event.
   * @param eventData - Data for the new event.
   */

 createEvent: async (eventData: {
  name: string;
    description: string;
    date: string;
    location: string;
    image?: File;
 }): Promise<void> => {
  try {
    const formData = new FormData();
    Object.entries(eventData).forEach(([key, value]) => {
      if(value !==undefined) formData.append(key, value as string | Blob);
    });

    await AuthAPI.post('/events', formData, {
      headers: { 'Content-Type': 'multipart/form-data'},
    });
  } catch (error) {
    console.error('Failed to create event:', error);
    throw new Error('Unable to create event.');
  }
 },

   /**
   * Updates an existing event.
   * @param eventId - ID of the event to update.
   * @param eventData - Updated event data.
   */

   updateEvent: async (
    eventId: string,
    eventData: {
      name?: string;
      description?: string;
      date?: string;
      location?: string;
      image?: File;
    }
   ): Promise<void> => {
    try {
      const formData = new FormData();
      Object.entries(eventData).forEach(([key, value]) => {
        if( value !== undefined) formData.append(key, value as string | Blob)
      });

      await AuthAPI.put(`/events/${eventId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data'},
      });
    } catch (error) {
      console.error('Failed to update event:', error);
      throw new Error('Unable to update event')
    }
   },

    /**
   * Deletes an event by ID.
   * @param eventId - ID of the event to delete.
   */

    deleteEvent: async (eventId: string): Promise<void> => {
      try {
        await AuthAPI.delete(`/events/${eventId}`)
      } catch (error) {
        console.error('Failed to delete event:', error);
        throw new Error('Unable to delete event');
      }
    }
}