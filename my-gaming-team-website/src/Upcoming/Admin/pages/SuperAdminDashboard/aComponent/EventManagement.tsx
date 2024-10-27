import axios from "axios";
import React, { useState } from "react"


const EventManagement: React.FC = () => {

    const [eventName, setEventName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const handleCreateEvent = async () => {
        try {
            await axios.post('/api/events/create', {
                eventName, date, description, location,
            });
            alert('Event created successfully')
        } catch (error) {
            console.error('Failed to create event');
        }
    };

    return (
        <div>
            <h2>Create Event</h2>
            <input type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={(e)  => setDescription(e.target.value)}></textarea>
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <button onClick={handleCreateEvent}>Create Event</button>
        </div>
    );

};

export default EventManagement

