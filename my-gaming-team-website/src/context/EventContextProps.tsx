import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../services/eventService';
import { Event, EventContextType, CreateEventPayload, UpdateEventPayload } from '../types/event';
import { toast } from 'react-toastify';

const EventContext = createContext<EventContextType | null>(null);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAllEvents = async () => {
    setLoading(true);
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (error: any) {
      console.error('Failed to fetch events:', error);
      toast.error('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (newEvent: CreateEventPayload) => {
    try {
      const event = await createEvent(newEvent);
      setEvents((prevEvents) => [...prevEvents, event]);
      toast.success('Event added successfully!');
    } catch (error: any) {
      console.error('Failed to add event:', error);
      toast.error('Failed to add event. Please try again.');
      throw error;
    }
  };

  const editEvent = async (updatedEvent: UpdateEventPayload) => {
    try {
      const event = await updateEvent(updatedEvent);
      setEvents((prevEvents) =>
        prevEvents.map((ev) => (ev.id === updatedEvent.id ? event : ev))
      );
      toast.success('Event updated successfully!');
    } catch (error: any) {
      console.error('Failed to update event:', error);
      toast.error('Failed to update event. Please try again.');
      throw error;
    }
  };

  const removeEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      setEvents((prevEvents) => prevEvents.filter((ev) => ev.id !== eventId));
      toast.success('Event deleted successfully!');
    } catch (error: any) {
      console.error('Failed to delete event:', error);
      toast.error('Failed to delete event. Please try again.');
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

export const useEventContext = (): EventContextType => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }

  return context;
};
