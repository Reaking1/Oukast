import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateAdminForm from "../Admin Fourm/CreateAdminForm";
import ApproveEventsForm from "../Approve Event/ApproveEventsForm";
import EventHistoryForm from "../History/History";

const SuperAdminDashboard: React.FC = () => {
  const [clock, setClock] = useState("");

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f0f4f8] via-[#e6e9ef] to-[#f5f7fa] text-gray-800 p-6 md:p-10 font-ubuntu">
      {/* Header */}
  <header className="mb-6 border-b pb-4">
  <div className="mb-2">
   <h1 className="text-4xl font-bold tracking-tight text-black font-poppins">
  Super Admin Dashboard
</h1>
<p className="text-md text-gray-600 font-poppins font-medium">
  Manage admins, approve events, and monitor history
</p>
  </div>

  {/* Move Clock Below Header */}
  <div className="mt-4">
    <span className="font-mono text-lg bg-white shadow px-4 py-2 rounded-md inline-block">
      {clock}
    </span>
  </div>
</header>


      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <Tabs defaultValue="create-admin" className="w-full">
          <TabsList className="flex space-x-4 mb-6 bg-gray-100 p-2 rounded-lg">
            <TabsTrigger value="create-admin" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2 rounded-md">
              Create Admin
            </TabsTrigger>
            <TabsTrigger value="approve-events" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2 rounded-md">
              Approve Events
            </TabsTrigger>
            <TabsTrigger value="event-history" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2 rounded-md">
              Event History
            </TabsTrigger>
          </TabsList>

          {/* Create Admin Section */}
          <TabsContent value="create-admin">
            <Card className="shadow-md border-none rounded-xl bg-[#fafafa]">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Create Admin / Super Admin</CardTitle>
              </CardHeader>
              <CardContent>
                <CreateAdminForm />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approve Events Section */}
          <TabsContent value="approve-events">
            <Card className="shadow-md border-none rounded-xl bg-[#fafafa]">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Approve or Post Events</CardTitle>
              </CardHeader>
              <CardContent>
                <ApproveEventsForm />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event History Section */}
          <TabsContent value="event-history">
            <Card className="shadow-md border-none rounded-xl bg-[#fafafa]">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Event History</CardTitle>
              </CardHeader>
              <CardContent>
                <EventHistoryForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default SuperAdminDashboard;
