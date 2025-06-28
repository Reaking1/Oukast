import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventService } from "@/services/eventService"; // Corrected import
import { EventData } from "@/Types/Event";

const ApproveEventsForm: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingEvents();
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
        <CardTitle>Pending Event Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading events...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && events.length === 0 && <p>No pending events.</p>}

        {!loading && events.map((event) => (
  <div key={event._id} className="border p-4 rounded-md shadow-sm bg-white text-black mb-4">
    <h3 className="text-lg font-semibold">{event.eventName}</h3>
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
      </CardContent>
    </Card>
  );
};

export default ApproveEventsForm;
