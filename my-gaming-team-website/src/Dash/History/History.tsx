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
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
    setSelectedEvent(event)
  };
const handleUpdateEvent = async () => {
 if (!selectedEvent || !selectedEvent._id) return;

  const formData = new FormData();

  // Append only fields that are present
  if (selectedEvent.eventName) formData.append("eventName", selectedEvent.eventName);
  if (selectedEvent.description) formData.append("description", selectedEvent.description);
  if (selectedEvent.location) formData.append("location", selectedEvent.location);
  if (selectedEvent.date) formData.append("date", selectedEvent.date);
  if (selectedEvent.status) formData.append("status", selectedEvent.status);
  if (selectedEvent.imageName instanceof File) {
    formData.append("imageName", selectedEvent.imageName);
  }

  try {
    await EventService.updateEvent(selectedEvent._id, formData);
    toast.success("Event updated successfully");
    fetchAllEvents();
    setSelectedEvent(null); // ✅ Reset edit form
  } catch (err) {
    toast.error("Failed to update event");
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
                    <DropdownMenuItem onClick={() => handleEdit(event)}>
                      ✏️ Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(event._id)}>
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
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Edit Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            name="eventName"
            placeholder="Event Name"
            value={selectedEvent.eventName}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, eventName: e.target.value })
            }
          />
          <Input
            name="location"
            placeholder="Location"
            value={selectedEvent.location}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, location: e.target.value })
            }
          />
          <Input
            name="date"
            type="date"
            value={selectedEvent.date}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, date: e.target.value })
            }
          />

          <Input
           type="file"
             accept="image/*"
             onChange={(e) =>
           setSelectedEvent({
            ...selectedEvent!,
              imageName: e.target.files?.[0] || null,
    })
  }
/>


          <Textarea
            name="description"
            placeholder="Event Description"
            value={selectedEvent.description}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent, description: e.target.value })
            }
          />
          <Button
            onClick={handleUpdateEvent}
            className="bg-black hover:bg-gray-800 text-white font-semibold w-full"
          >
            💾 Save Changes
          </Button>
        </CardContent>
      </Card>
    )}
  </>
);

};

export default EventHistoryForm;
