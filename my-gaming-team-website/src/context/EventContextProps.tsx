import React, { createContext, useContext, useState } from 'react';
import { Event } from '../types';
import { addEvent, updateEvent, deleteEvent } from '../services/eventService';

interface EventContextProps {
  events: Event[];
  addNewEvent: (event: Omit<Event, 'id'>) => void;
  updateExistingEvent: (id: string, event: Omit<Event, 'id'>) => void;
  removeEvent: (id: string) => void;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  const addNewEvent = async (eventData: Omit<Event, 'id'>) => {
    const newEvent = await addEvent(eventData);
    setEvents([...events, newEvent]);
  };

  const updateExistingEvent = async (id: string, eventData: Omit<Event, 'id'>) => {
    const updatedEvent = await updateEvent(id, eventData);
    setEvents(events.map(event => (event.id === id ? updatedEvent : event)));
  };

  const removeEvent = async (id: string) => {
    await deleteEvent(id);
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addNewEvent, updateExistingEvent, removeEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};
