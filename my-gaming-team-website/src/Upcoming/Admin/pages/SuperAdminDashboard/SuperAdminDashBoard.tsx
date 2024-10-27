import React, { useState } from "react";
import AdminManagement from "./aComponent/AdminManagement";
import EventManagement from "./aComponent/EventManagement";
import Messaging from "./aComponent/Messaging";
import './SuperAdminDashboard.css'

const SuperAdminDashboard: React.FC = () => {
    const [activeSection, setActiveSection] = useState('admins')

    return (
        <div className="super-admin-dashboard">
            <aside className="sidebar">
                <ul>
                    <li onClick={() => setActiveSection('admins')} className={activeSection === 'admins' ? 'active' : ''}>Manage Admins</li>
                    <li onClick={() =>  setActiveSection('events')} className={activeSection === 'events' ? 'active' : ''}>Manage Events</li>
                    <li onClick={() =>  setActiveSection('messaging')} className={activeSection === 'messaging' ? 'active' : ''}>Messaging</li>
                </ul>
            </aside>
            <main className="main-content">
                {activeSection === 'admins' && <AdminManagement />}
                {activeSection === 'events' && <EventManagement />}
                {activeSection === 'messaging' && <Messaging />}
            </main>
        </div>
    );
};

export default SuperAdminDashboard