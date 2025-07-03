import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventService } from "@/services/eventService"; // Corrected import
import { EventData } from "@/Types/Event";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ApproveEventsForm: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState({ eventName: "", description: "", location: "", date: "", imageName: null});
const [approvedOrRejectedEvents, setApprovedOrRejectedEvents] = useState<EventData[]>([]);

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
    } catch (err) {
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const fetchOtherEvents = async () => {
  const allEvents = await EventService.fetchEvents();
  const filtered = allEvents.filter((e) => e.status !== "pending");
  setApprovedOrRejectedEvents(filtered);
};
  const handleNewEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
};

  const handleCreateEvent = async () => {
    try {
      const formData = new FormData();
      
      formData.append("eventName", newEvent.eventName);
      formData.append("description", newEvent.description);
      formData.append("location", newEvent.location);
      formData.append("date", newEvent.date)
      if(newEvent.imageName) {
        formData.append("image", newEvent.imageName);
      }
      formData.append("status", "approved");
      await EventService.createEvent(formData);
      setNewEvent({  eventName: "", description: "", location: "", date: "", imageName: null});
      fetchPendingEvents();
    } catch (error) {
       alert("Failed to create event.");
    }
  }

  const handleApprove = async (eventId: string) => {
    try {
      await EventService.updateEvent(eventId, { status: "approved" });
      fetchPendingEvents();
    } catch {
      alert("Failed to approve event");
    }
  };

  const handleReject = async (eventId: string) => {
    try {
      await EventService.updateEvent(eventId, { status: "rejected" });
      fetchPendingEvents();
    } catch {
      alert("Failed to reject event");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Management</CardTitle>
      </CardHeader>
      <CardContent>
        {/** 1. Event Creation Form (for super admins) ✅  */}
   {/* Section 1: Event Creation */}
<div className="mb-6">
  <h3 className="text-xl font-bold mb-2">Create New Event</h3>
  <Input
    name="eventName"
    placeholder="Event Name"
    value={newEvent.eventName}
    onChange={handleNewEventChange}
    className="mb-2"
  />
  <Input
  name="location"
  placeholder="Location"
  value={newEvent.location}
  onChange={handleNewEventChange}
 />

<Input
  name="date"
  placeholder="Date"
  type="date"
  value={newEvent.date}
  onChange={handleNewEventChange}
/>

  <Textarea
    name="description"
    placeholder="Event Description"
    value={newEvent.description}
    onChange={handleNewEventChange}
    className="mb-2"
  />
  <Input
  type="file"
  name="image"
  accept="image/*"
  onChange={(e) =>
    setNewEvent({ ...newEvent, imageName: e.target.files?.[0] || null })
  }
/>

  <Button onClick={handleCreateEvent}>Create Event</Button>
</div>

           {/**   2. Pending Event Approvals (if you're a super admin) ✅ */}
           {/* Section 2: Pending Event Approvals */}
<div className="mb-6">
  <h3 className="text-xl font-bold mb-2">Pending Event Requests</h3>
  {loading && <p>Loading events...</p>}
  {error && <p className="text-red-600">{error}</p>}
  {!loading && events.length === 0 && <p>No pending events.</p>}

  {!loading &&
    events.map((event) => (
      <div
        key={event._id}
        className="border p-4 rounded-md shadow-sm bg-white text-black mb-4"
      >
        <h4 className="text-lg font-semibold">{event.eventName}</h4>
        <p className="text-sm text-gray-600">{event.description}</p>
        <div className="flex gap-3 mt-4">
          <Button onClick={() => handleApprove(event._id)} variant="default">
            Approve
          </Button>
          <Button onClick={() => handleReject(event._id)} variant="destructive">
            Reject
          </Button>
        </div>
      </div>
    ))}
</div>

              {/**  3. Approved/Rejected Events List (optional, but useful) ✅  */}
              {/* Section 3: Approved & Rejected Events */}
<div>
  <h3 className="text-xl font-bold mb-2">Approved/Rejected Events</h3>
  {approvedOrRejectedEvents.map((event) => (
    <div key={event._id} className="border p-4 rounded bg-slate-100 mb-2">
      <h4>{event.eventName}</h4>
      <p>Status: <strong>{event.status}</strong></p>
    </div>
  ))}
</div>

      </CardContent>
    </Card>
  );
};

export default ApproveEventsForm;
