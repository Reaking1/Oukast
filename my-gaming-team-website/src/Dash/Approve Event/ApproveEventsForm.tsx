import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EventService } from "@/services/eventService";
import { CreateEventData, EventData } from "@/Types/Event";

const ApproveEventsForm: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [approvedOrRejectedEvents, setApprovedOrRejectedEvents] = useState<EventData[]>([]);
  const [newEvent, setNewEvent] = useState<CreateEventData>({
    eventName: "",
    description: "",
    location: "",
    date: "",
    imageName: null,
    status: "approved",
  });

  useEffect(() => {
    fetchPendingEvents();
    fetchOtherEvents();
  }, []);

  const fetchPendingEvents = async () => {
    setLoading(true);
    try {
      const allEvents = await EventService.fetchEvents();
      const pending = allEvents.filter((event) => event.status === "pending");
      setEvents(pending);
      setError(null);
    } catch (err) {
      setError("Failed to fetch events.");
      toast.error("Could not load pending events.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOtherEvents = async () => {
    try {
      const allEvents = await EventService.fetchEvents();
      const filtered = allEvents.filter((e) => e.status !== "pending");
      setApprovedOrRejectedEvents(filtered);
    } catch (err) {
      toast.error("Failed to fetch reviewed events.");
    }
  };

  const handleNewEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name !== "image") {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const handleCreateEvent = async () => {
    try {
      const formData = new FormData();
      formData.append("eventName", newEvent.eventName);
      formData.append("description", newEvent.description);
      formData.append("location", newEvent.location);
      formData.append("date", newEvent.date);
      if (newEvent.imageName) {
        formData.append("image", newEvent.imageName);
      }
      formData.append("status", "approved");

      await EventService.createEvent(formData);
      toast.success("Event created successfully!");
      setNewEvent({
        eventName: "",
        description: "",
        location: "",
        date: "",
        imageName: null,
        status: "approved",
      });
      fetchPendingEvents();
      fetchOtherEvents();
    } catch (err) {
      toast.error("Failed to create event.");
    }
  };

  const handleApprove = async (eventId: string) => {
    try {
      await EventService.updateEvent(eventId, { status: "approved" });
      toast.success("Event approved!");
      fetchPendingEvents();
      fetchOtherEvents();
    } catch {
      toast.error("Failed to approve event.");
    }
  };

  const handleReject = async (eventId: string) => {
    try {
      await EventService.updateEvent(eventId, { status: "rejected" });
      toast.success("Event rejected.");
      fetchPendingEvents();
      fetchOtherEvents();
    } catch {
      toast.error("Failed to reject event.");
    }
  };

  return (
    <Card className="space-y-10 p-6">
      {/* Create New Event */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Input
      name="eventName"
      placeholder="Event Name"
      value={newEvent.eventName}
      onChange={handleNewEventChange}
    />
    <Input
      name="location"
      placeholder="Location"
      value={newEvent.location}
      onChange={handleNewEventChange}
    />
    <Input
      name="date"
      type="date"
      value={newEvent.date}
      onChange={handleNewEventChange}
    />
    <Input
      type="file"
      name="image"
      accept="image/*"
      onChange={(e) =>
        setNewEvent({
          ...newEvent,
          imageName: e.target.files?.[0] ?? null,
        })
      }
    />
  </div>

  <Textarea
    name="description"
    placeholder="Event Description"
    value={newEvent.description}
    onChange={handleNewEventChange}
  />

  <Button
    onClick={handleCreateEvent}
    className="bg-black hover:bg-gray-800 text-white font-semibold text-md w-full sm:w-auto"
  >
    🚀 Create Event
  </Button>

  {error && <p className="text-red-600 text-sm">{error}</p>}
</CardContent>

      </Card>

      {/* Pending Event Approvals */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Event Approvals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-muted-foreground">No pending events.</p>
          ) : (
            events.map((event) => (
              <div key={event._id} className="border p-4 rounded-md shadow-sm bg-white">
                <h4 className="font-semibold">{event.eventName}</h4>
                <p className="text-sm text-gray-600">{event.description}</p>
                <div className="flex gap-4 mt-4">
  <Button
    onClick={() => handleApprove(event._id)}
    className="bg-black hover:bg-gray-800 text-white font-semibold text-md"
  >
    Approve
  </Button>
  <Button
    variant="destructive"
    onClick={() => handleReject(event._id)}
  >
    Reject
  </Button>
</div>

              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Reviewed Events */}
      <Card>
        <CardHeader>
          <CardTitle>Reviewed Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {approvedOrRejectedEvents.length === 0 ? (
            <p className="text-muted-foreground">No events have been reviewed yet.</p>
          ) : (
            approvedOrRejectedEvents.map((event) => (
              <div
                key={event._id}
                className={`border p-4 rounded-md shadow-sm flex flex-col sm:flex-row gap-4 ${
                  event.status === "approved" ? "bg-green-50" : "bg-red-50"
                }`}
              >
                {event.imageName && (
                  <img
                   src={`http://localhost:5000/uploads/events/${event.imageName}`}
                    alt={event.eventName}
                    className="w-full sm:w-40 h-32 object-cover rounded-md border"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold">{event.eventName}</h4>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <p className="text-sm">📍 {event.location}</p>
                  <p className="text-sm">📅 {new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-sm mt-1 font-semibold">
                    Status:{" "}
                    <span className={event.status === "approved" ? "text-green-600" : "text-red-600"}>
                      {event.status === "approved" ? "✅ Approved" : "❌ Rejected"}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </Card>
  );
};

export default ApproveEventsForm;
