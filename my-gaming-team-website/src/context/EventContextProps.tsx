import { EventService } from '../services/eventService';
import { CreateEventData, EventData, EventUpdateData } from '../Types/Event';
import  { createContext, useState, useEffect, ReactNode } from 'react';

import { toast } from 'react-toastify';


/**
 * Defines the shape of the events context
 */

interface EventContextType {
 events: EventData[];
 loading: boolean;
 fetchAllEvents: () => Promise<void>;
 addEvent: (newEvent: CreateEventData) => Promise<void>;
 editEvent: (eventId: string, updatedEvent: EventUpdateData) => Promise<void>;
 removeEvent: (eventId: string) => Promise<void>;
}


export const EventContext = createContext<EventContextType | null>(null);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  /**
   * Fetch all events from the backend and update state.
   */
  const fetchAllEvents = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await EventService.fetchEvents();
      setEvents(data);
    } catch (error) {
      if(error instanceof Error){
      console.error('Failed to fetch events:', error);
      toast.error('Failed to load events. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add a new event to the list
   * @param newEvent - The event data to create
   */

  const addEvent = async (newEvent: CreateEventData): Promise<void> => {
    try {
      const event = await EventService.createEvent(newEvent);
      setEvents((prevEvents) => [...prevEvents, event]);
      toast.success('Event added successfully!');
    } catch (error) {
      if(error instanceof Error) {
      console.error('Failed to add event:', error);
      toast.error('Failed to add event. Please try again.');
      }
      throw error;
    }
  };


  /**
   * Edit an existing event.
   * @param eventId- The ID of the event to update
   * @param updatedEvent - the updated event data
   */

  const editEvent = async (eventId: string, updatedEvent: EventUpdateData): Promise<void> => {
    try {
      const event = await EventService.updateEvent(eventId, updatedEvent); // ✅ Use EventData
      setEvents((prevEvents) =>
        prevEvents.map((ev) => (ev._id === updatedEvent._id ? event : ev))
      );
      toast.success('Event updated successfully!');
    } catch (error) {
      console.error('Failed to update event:', error);
      toast.error('Failed to update event. Please try again.');
      throw error;
    }
  };
  

  /**
   * Remove an event from the list.
   * @param eventId - The ID of the event to remove.
   */

  const removeEvent = async (eventId: string): Promise<void> => {
    try {
      await EventService.deleteEvent(eventId);
      setEvents((prevEvents) => prevEvents.filter((ev) => ev._id !== eventId));
      toast.success('Event deleted successfully!');
    } catch (error) {
      if(error instanceof Error) {
      console.error('Failed to delete event:', error);
      toast.error('Failed to delete event. Please try again.');
      }
      throw error;
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{ 
        events,
        loading,
        fetchAllEvents,
        addEvent,
        editEvent,
        removeEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export type {EventContextType}