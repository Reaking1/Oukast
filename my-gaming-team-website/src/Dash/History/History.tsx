import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventService } from "@/services/eventService";
import { EventData } from "@/Types/Event";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const EventHistoryForm: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllEvents();
  }, []);

 useEffect(() => {
  const lowerSearch = searchTerm.toLowerCase();
  const filtered = events.filter((event) => {
    return (
      event.eventName.toLowerCase().includes(lowerSearch) ||
      event.date?.toLowerCase().includes(lowerSearch)
    );
  });
  setFilteredEvents(filtered);
}, [searchTerm, events]); // ✅ runs only when these change


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
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span>Event History</span>
          <Input
            type="text"
            placeholder="Search by name or date"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading event history...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && filteredEvents.length === 0 && <p>No matching events found.</p>}

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="border p-4 rounded-md bg-white text-black shadow-sm"
            >
              <div className="flex justify-between items-center"> 
                <h3 className="text-lg font-bold">{event.eventName}</h3>
                <Badge className={statusColor(event.status || "pending")}>
                  {event.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                📍 {event.location} | 📅 {new Date(event.date).toLocaleDateString("en-ZA")}
              </p>
              <p className="text-xs text-gray-500">
                Posted by: <span className="font-medium">
                  {typeof event.createdBy === "object"
                  ? event.createdBy.name || event.createdBy.email 
                  : event.createdBy || "Unkown"
                }</span>
              </p>
              {event.createdAt && (
                <p className="text-xs text-gray-400">
                  Created: {new Date(event.createdAt).toLocaleString("en-ZA")}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventHistoryForm;
