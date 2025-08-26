// src/Events/UpcomingEvents.tsx
import React, { useEffect, useState } from 'react';
import { EventData } from '@/Types/Event';
import { EventService } from '@/services/eventService';
import { motion } from 'framer-motion';
import fallbackImage from '../../public/assets/react.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredEvents = events.filter(event =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-24 px-4 md:px-20 bg-gradient-to-b from-gray-50 to-purple-50">
      {/* Header */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-purple-700 mb-10">
        Upcoming Events
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-12">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400 shadow-sm"
          />
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            color="#6B21A8"
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
          />
        </div>
      </div>

      {/* Event Cards */}
      <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-purple-200 hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={`http://localhost:5000/uploads/events/${event.imageName}`}
                alt={event.eventName}
                onError={(e) => { e.currentTarget.src = fallbackImage; }}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-purple-800 mb-1">{event.eventName}</h3>
                <p className="text-sm text-gray-700">{event.location}</p>
                <p className="text-sm text-purple-600 mt-1">{new Date(event.date).toDateString()}</p>
                <p className="text-xs text-gray-500 mt-3">
                  Organized by {typeof event.createdBy === 'string' ? event.createdBy : event.createdBy?.name ?? 'Unknown'}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
