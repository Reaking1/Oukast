import React, { useEffect, useState } from 'react';
import './EventPage.css';
import io from 'socket.io-client'; // Importing socket.io-client
import { EventService } from '../../services/eventService';
import { EventData } from '@/Types/Event';
import './EventPage.css'

const socket = io('http://localhost:5000'); // Initialize the socket connection (adjust the URL as per your server)

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
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
      const data = await EventService.fetchEvents();
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
       <h1 className="event-title">Unpcoming Events</h1>

       {loading ? (
        <p className="loading-text">Loading events...</p>
       ) : error ?(
        <p className="error-message">{error}</p>
       ):(
        <div className="event-container">
          {events.map(event => (
            <div key={event.id} className="event-card">
              {event.image ? (
                <img src={URL.createObjectURL(event.image)} alt={event.name} className='event-image' />
              ) : (
                <div className="placeholder-image">No Image Available</div>
              )}
              <div className="event-info">
                <h3 className="event-name">{event.name}</h3>
                <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                <p className="event-description">{event.description}</p>
                <p className="event-location">📍{event.location}</p>
              </div>
            </div>
          ))}
        </div>
       )}
    </div>
  );
};

export default EventPage;
