import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EventHistoryForm from "../History/History";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PostEventForm from "../PosteventForum/PostEventForum";
import { useAuth } from "@/auth/hooks/useAuth"; // ✅ Use your hook

const AdminDashboard: React.FC = () => {
  const [clock, setClock] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ Your hook exposes logout

  // 🕒 Live clock logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setClock(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Clean logout logic
  const handleLogout = () => {
    logout(); // clears state + token
    toast.info("Logged out successfully.");
    navigate("/login"); // redirect
  };

  // ✅ Example success toast for form
  const handleTestToast = () => {
    toast.success("Your event has been sent for approval.");
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black p-6 md:p-10 font-ubuntu">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">
            Post events and view event history
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-lg">{clock}</span>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <Tabs defaultValue="post-event" className="w-full">
        <TabsList className="flex flex-wrap gap-2 mb-6">
          <TabsTrigger value="post-event">Post Event</TabsTrigger>
          <TabsTrigger value="event-history">Event History</TabsTrigger>
        </TabsList>

        <TabsContent value="post-event">
          <Card>
            <CardHeader>
              <CardTitle>Post New Event</CardTitle>
            </CardHeader>
            <CardContent>
              <PostEventForm onSubmitSuccess={handleTestToast} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="event-history">
          <Card>
            <CardHeader>
              <CardTitle>Event History</CardTitle>
            </CardHeader>
            <CardContent>
              <EventHistoryForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AdminDashboard;
