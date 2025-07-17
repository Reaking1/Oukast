import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EventService } from '../../services/eventService';
import { toast } from "sonner";

interface Props {
  createdBy: string; // admin ID
}

const CreateEventForm: React.FC<Props> = ({ createdBy }) => {
  const [form, setForm] = useState({
    eventName: '',
    description: '',
    location: '',
    date: '',
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setForm(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async () => {
    if (!form.image) {
      toast.error("Please upload an event image.");
      return;
    }

    const formData = new FormData();
    formData.append('eventName', form.eventName);
    formData.append('description', form.description);
    formData.append('location', form.location);
    formData.append('date', form.date);
    formData.append('image', form.image);
    formData.append('status', 'pending');
    formData.append('createdBy', createdBy); // ✅ Track who created the event

    try {
      await EventService.createEvent(formData);
      toast.success("✅ Event submitted for approval!");
      setForm({ eventName: '', description: '', location: '', date: '', image: null });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`❌ Failed to submit: ${errorMessage}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <input
        name="eventName"
        placeholder="Event Name"
        onChange={handleChange}
        value={form.eventName}
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        value={form.description}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="location"
        placeholder="Location"
        onChange={handleChange}
        value={form.location}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="date"
        type="date"
        onChange={handleChange}
        value={form.date}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="image"
        type="file"
        onChange={handleImageChange}
        className="w-full mb-4"
      />
      <Button onClick={handleSubmit}>Submit Event</Button>
    </div>
  );
};

export default CreateEventForm;
