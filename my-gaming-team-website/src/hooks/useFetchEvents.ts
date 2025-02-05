import { useEffect, useState } from "react";
import { fecth } from "../services/eventService";
import { EventData } from "../Types/Event"; // Import renamed type
import { toast } from "react-toastify";

const useFetchEvents = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response: EventData[] = await fetchEvents(); // Ensure response is typed
        setEvents(response);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setError(error.message || "Failed to fetch events.");
        toast.error("Error fetching events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};

export default useFetchEvents;
