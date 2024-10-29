import axios from "axios";
import React, { useState } from "react"


const EventManagement: React.FC = () => {

    const [eventName, setEventName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState<File | null>(null);//For handling image file
    const [preview, setPreview] = useState<string | null>(null); //For previewing the image

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if(file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); //Display image preview
        }
    };

    const handleCreateEvent = async () => {
        try {
            const formData = new FormData();
            formData.append('name', eventName);
            formData.append('date', eventName);
            formData.append('description', eventName);
            formData.append('location', eventName);
            if(image) formData.append('image', image)
            await axios.post('/api/events/create', {
                eventName, date, description, location,image,
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
            <input type="file" accept="image" onChange={handleImageChange} />
            {preview && <img  src={preview} alt="Preview" style={{maxWidth: '200px', marginTop: '10px'}} />}
            <button onClick={handleCreateEvent}>Create Event</button>
        </div>
    );

};

export default EventManagement

