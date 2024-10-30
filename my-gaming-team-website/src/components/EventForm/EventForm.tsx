import React, { useState } from 'react';
import './EventForm.css';
import { Event } from '../../types';

interface EventFormProps {
  onClose: () => void;
  onSubmit: (data: Omit<Event, 'id'>, id?: string) => void;
  initialData?: Event | null;
}

const EventForm: React.FC<EventFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [date, setDate] = useState(initialData?.date.slice(0, 10) || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [image, setImageUrl] = useState(initialData?.image || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !date || !description || !location || !image) {
      setError('All fields are required.');
      return;
    }
    onSubmit({ name, date, description, location, image }, initialData?.id);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initialData ? 'Edit Event' : 'Add Event'}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Event Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              value={image}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">{initialData ? 'Update' : 'Add'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
