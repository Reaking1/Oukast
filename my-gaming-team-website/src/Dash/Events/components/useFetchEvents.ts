import { useEffect, useState } from "react";
import { EventService } from "../../../services/eventService";
import { EventData } from "../../../Types/Event"; // Import renamed type
import { toast } from "react-toastify";

const useFetchEvents = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      try {
        const response: EventData[] = await EventService.fetchEvents(); //Correct function call
        setEvents(response);
        setError(null)
      } catch (error) {
        console.error("Failed to fetch events", error);
        setError(error instanceof Error ? error.message: "Failed to fetch events.");
        toast.error("Error fetching events. Please try again.");
      } finally {
        setLoading(false)
      }
    };

    fetchEventData();
  }, []);

  return { events, loading, error };
};

export default useFetchEvents;
