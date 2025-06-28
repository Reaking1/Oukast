import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventService } from "@/services/eventService";
import { EventData } from "@/Types/Event";
import { Badge } from "@/components/ui/badge";

const EventHistoryForm: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    setLoading(true);
    try {
      const allEvents = await EventService.fetchEvents();
      setEvents(allEvents);
    } catch (err) {
      setError("Failed to fetch event history");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-200 text-green-800";
      case "rejected":
        return "bg-red-200 text-red-800";
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event History</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading event history...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && events.length === 0 && <p>No events found.</p>}

        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="border p-4 rounded-md bg-white text-black shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{event.title}</h3>
                <Badge className={statusColor(event.status)}>{event.status}</Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Posted by: <span className="font-medium">{event.createdBy?.eventName || event.createdBy?.email || "Unknown"}</span>
              </p>
              <p className="text-xs text-gray-400">
                Created: {new Date(event.createdAt).toLocaleString("en-ZA")}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventHistoryForm;
