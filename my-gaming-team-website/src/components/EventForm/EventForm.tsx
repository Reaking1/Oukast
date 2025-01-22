import React, { useState } from 'react';
import './EventForm.css';
import { toast } from 'react-toastify';
import { updateEvent } from '../../services/eventService';


type EventFormProps = {
  event?: {
    id: string;
    name: string;
    description: string;
    location: string;
    date: string;
    image?: File;
  };
  onSubmitSuccess: () => void;
};

const EventForm: React.FC<EventFormProps> = ({ event, onSubmitSuccess}) => {
  const [formData, setFormData] = useState({
    name: event?.name || '',
    description: event?.description || '',
    location: event?.location || '',
    date: event?.date || '',
    image: null as File | null,
  });
   

  const [isSubmitting, setIsSubmitting] = useState(false);
    

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({ ...prev, [name]: value}));
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({...prev, image: file}));
  }

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (event) {
        await updateEvent(event.id, formData);
        toast.success('Event updated successfully!');
      } else {
        await createEvent(formData);
        toast.success('Event added successfully!');
      }

      onSubmitSuccess();
    } catch (error) {
      toast.error('Failed to save event. Please try again');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Event Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : event ? 'Update Event' : 'Add Event'}
      </button>
    </form>
  );
  
}

export default EventForm;







