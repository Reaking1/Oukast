import { useEffect, useState } from 'react';
import { getEvents } from '../services/eventService';
import { Event } from '../types/event';
import { toast } from 'react-toastify';

/**
 * Custom hook for fetching events.
 * @returns Object containing events, loading state, and error (if any).
 */
const useFetchEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getEvents();
        setEvents(response);
        setError(null); // Reset error state on successful fetch
      } catch (err: any) {
        console.error('Failed to fetch events:', err);
        setError(err?.message || 'Failed to fetch events.');
        toast.error('Error fetching events. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};

export default useFetchEvents;
