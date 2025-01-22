// src/services/eventService.ts

import { CreateEventData, Event, EventUpdateData } from "@/Types/Event";
import { EventAPI } from "./api"


export const EventService = {
   /**
   * Fetches all events from the backend.
   * @returns A list of events.
   */

   fetchEvents: async (): Promise<Event[]> => {
    try {
      const response = await EventAPI.getAllEvents();
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

 createEvent: async (eventData: CreateEventData): Promise<Event> => {
  try {
   const response = await EventAPI.createEvent(eventData);
    return response.data;
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
    eventData: EventUpdateData
   ): Promise<Event> => {
    try {
    const response = await EventAPI.updateEvent(eventId, eventData);
    return response.data;
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
        await EventAPI.deleteEvent(eventId)
      } catch (error) {
        console.error('Failed to delete event:', error);
        throw new Error('Unable to delete event');
      }
    }
}