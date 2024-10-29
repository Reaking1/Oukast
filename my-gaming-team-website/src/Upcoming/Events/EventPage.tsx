import React, { useEffect, useState } from 'react';
import './EventPage.css';
import { getEvents } from '../../services/eventService';
import { Event } from '../../types';
import io from 'socket.io-client'; // Importing socket.io-client

const socket = io('http://localhost:5000'); // Initialize the socket connection (adjust the URL as per your server)

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchEvents();

    const interval = setInterval(() => {
      fetchEvents();
    }, 5000);

    // Listen for event updates through the socket
    socket.on('eventUpdate', () => {
      fetchEvents();
    });

    return () => {
      clearInterval(interval);
      socket.off('eventUpdate'); // Clean up socket listeners on unmount
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch events', err);
      setError('Failed to load events.');
      setLoading(false);
    }
  };

  return (
    <div className="event-page">
        <h1>Upcoming Events</h1>
      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              {event.image ? (
                <img src={event.image} alt={`${event.name} logo`} className="event-logo" />
              ) : (
                <div className="placeholder-logo">No Image Available</div>
              )}
              <h3>{event.name}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>{event.description}</p>
              <p>Location: {event.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventPage;
