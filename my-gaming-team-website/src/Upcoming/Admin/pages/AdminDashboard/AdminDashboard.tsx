import React, { useEffect, useState, useRef } from 'react';
import './AdminDashboard.css';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../../../services/eventService';
import { Event } from '../../../../types';
import EventForm from '../../../../components/EventForm/EventForm';
import gsap from 'gsap';

const AdminDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [adminName] = useState<string>('');
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchEvents();
    animateDashboard();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  const animateDashboard = () => {
    if (dashboardRef.current) {
      gsap.from(dashboardRef.current, { opacity: 0, y: -50, duration: 1, ease: 'power3.out' });
    }
  };

  const handleAdd = () => {
    setCurrentEvent(null);
    setFormOpen(true);
  };

  const handleEdit = (event: Event) => {
    setCurrentEvent(event);
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Failed to delete event', error);
    }
  };

  const handleFormSubmit = async (eventData: Omit<Event, 'id'>, id?: string) => {
    try {
      if (id) {
        const updatedEvent = await updateEvent(id, eventData);
        setEvents(events.map(event => (event.id === id ? updatedEvent : event)));
      } else {
        const newEvent = await addEvent(eventData);
        setEvents([...events, newEvent]);
      }
      setFormOpen(false);
    } catch (error) {
      console.error('Failed to submit event', error);
    }
  };

  return (
    <div className="admin-dashboard" ref={dashboardRef}>
      <h1>Welcome, {adminName}</h1>
      <button className="add-button" onClick={handleAdd}>Add Event</button>
      <table className="events-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td><img src={event.logo} alt={`${event.name} logo`} className="event-logo" /></td>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(event)}>Edit</button>
                <button onClick={() => handleDelete(event.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isFormOpen && (
        <EventForm 
          onClose={() => setFormOpen(false)} 
          onSubmit={handleFormSubmit} 
          initialData={currentEvent} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;
