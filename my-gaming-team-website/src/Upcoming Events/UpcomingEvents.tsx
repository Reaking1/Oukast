// src/Events/UpcomingEvents.tsx
import React, { useEffect, useState } from 'react';
import { EventData } from '@/Types/Event'; // adjust path if needed
import { EventService } from '@/services/eventService'; // adjust import
import { motion } from 'framer-motion'; // already installed
import fallbackImage from '../../public/assets/react.svg'; // if imageName is missing

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await EventService.fetchEvents();
        const approvedEvents = allEvents.filter(event => event.status === 'approved');
        setEvents(approvedEvents);
      } catch (error) {
        console.error('Failed to load events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen py-16 px-4 md:px-20 bg-white">
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-10">Upcoming Events</h2>
      
      <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
        {events.map((event, index) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
           <img
src={`http://localhost:5000/uploads/events/${event.imageName}`}

  alt={event.eventName}
  onError={(e) => {
    e.currentTarget.src = fallbackImage;
  }}
  className="h-48 w-full object-cover"
/>

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{event.eventName}</h3>
              <p className="text-sm text-gray-700 mt-1">{event.location}</p>
              <p className="text-sm text-purple-600 mt-1">{new Date(event.date).toDateString()}</p>
              <p className="text-xs text-gray-500 mt-3">
                Organized by {typeof event.createdBy === 'string' ? event.createdBy : event.createdBy?.name ?? 'Unknown'}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
