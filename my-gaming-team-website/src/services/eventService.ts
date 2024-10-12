// src/services/eventService.ts

import axios from 'axios';
import { Event } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend API URL
  withCredentials: true, // If using cookies for auth
});

export const getEvents = async (): Promise<Event[]> => {
  const response = await api.get('/events');
  return response.data;
};

export const addEvent = async (eventData: Omit<Event, 'id'>): Promise<Event> => {
  const response = await api.post('/events', eventData);
  return response.data;
};

export const updateEvent = async (id: string, eventData: Omit<Event, 'id'>): Promise<Event> => {
  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/events/${id}`);
};
