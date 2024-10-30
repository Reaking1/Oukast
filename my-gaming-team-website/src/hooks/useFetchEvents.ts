import { getEvents } from "@/services/eventService";
import { useEffect, useState } from "react"




export const useFetchEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
                setLoading(false)
            } catch (err) {
                console.error('Failed to fetch events', err);
                setError('Faild to load events');
                setLoading(false)
            }
        };
        fetchEvents();
    }, []);

    return {events, loading, error}
}