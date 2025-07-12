import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList,TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateAdminForm from "../Admin Fourm/CreateAdminForm";
import ApproveEventsForm from "../Approve Event/ApproveEventsForm";
import EventHistoryForm from "../History/History";
//import EventHistoryForm from "../History/History";


const SuperAdminDashboard: React.FC = () => {
    const [clock, setClock] = useState("");

    //Clock logic
    useEffect(() => {
       const updateTime = () => {
         const now = new Date();
        const time = now.toLocaleTimeString("en-ZA", {hour: "2-digit", minute:'2-digit', second: '2-digit'});
        setClock(time);
       };

       updateTime();
       const interval = setInterval(updateTime, 1000);
       return () => clearInterval(interval);
    
    }, []);


    return (
        <main className="min-h-screen bg-[#f5f5f5] text-black p-6 md:p-10 font-ubuntu">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
                    <p className="text-sm text-gray-600">Mange admins, approve events, and more</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-lg">{clock}</span>
                    {/**The logout button should be here */}
                </div>
            </header>

            <Tabs defaultValue="create-admin" className="w-full">
                <TabsList className="flex flex-wrap gap-2 mb-6">
                    <TabsTrigger value="create-admin">Create Admin</TabsTrigger>
                     <TabsTrigger value="approve-events">Approve Events</TabsTrigger>
                      <TabsTrigger value="event-history">Event History</TabsTrigger>
                </TabsList>

                {/**Create Admin Section */}
                <TabsContent value="create-admin">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Admin / Super Admin</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CreateAdminForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                 {/* Approve Events Section */}
        <TabsContent value="approve-events">
          <Card>
            <CardHeader>
              <CardTitle>Approve or Post Events</CardTitle>
            </CardHeader>
            <CardContent>
             <ApproveEventsForm />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Event History Section */}
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
    )
};

export default SuperAdminDashboard