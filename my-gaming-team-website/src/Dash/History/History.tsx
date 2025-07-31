import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { EventService } from "@/services/eventService";
import { EventData, EventUpdateData } from "@/Types/Event";
import EditEventForm from "../EditForm/EditEventForm";

const EventHistoryForm: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventUpdateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllEvents();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = events.filter((event) =>
      event.eventName.toLowerCase().includes(lowerSearch) ||
      event.date?.toLowerCase().includes(lowerSearch)
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const fetchAllEvents = async () => {
    setLoading(true);
    try {
      const allEvents = await EventService.fetchEvents();
      setEvents(allEvents);
    } catch (err) {
      setError("Failed to fetch event history.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      await EventService.deleteEvent(eventId);
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (event: EventData) => {
    const { _id, eventName, description, location, date, status }  = event;
    setSelectedEvent({
      _id,
      eventName,
      description,
      location,
      date,
      imageName: undefined,
      status
    })
  };

const handleEditClose = () => {
  setSelectedEvent(null); // closes the edit form
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
  <>
    {/* 🔹 Event History List */}
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
        {loading && <p className="text-gray-600">Loading event history...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && filteredEvents.length === 0 && (
          <p>No matching events found.</p>
        )}

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {filteredEvents.map((event) => (
            <div 
              key={event._id}
              className="border p-4 rounded-lg bg-white shadow-sm relative"
            >
              {/* ...event display... */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{event.eventName}</h3>
                  <Badge className={`${statusColor(event.status || "pending")} mt-1`}>
                    {event.status}
                  </Badge>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(event)} className="text-black">
                      ✏️ Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(event._id)} className="text-black">
                      🗑️ Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-sm text-gray-600 mt-2">{event.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                📍 {event.location} | 📅{" "}
                {new Date(event.date).toLocaleDateString("en-ZA")}
              </p>
              <p className="text-xs text-gray-500">
                Posted by:{" "}
                <span className="font-medium">
                  {typeof event.createdBy === "object"
                    ? event.createdBy.name || event.createdBy.email
                    : event.createdBy || "Unknown"}
                </span>
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

    {/* 🔹 Edit Form Section (conditionally shown) */}
    {selectedEvent && (
    
        <EditEventForm event={selectedEvent} onClose={handleEditClose} onSave={fetchAllEvents} />
    )}
  </>
);

};

export default EventHistoryForm;
