// src/components/EventForm/EventForm.tsx

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
  const [date, setDate] = useState(initialData?.date.slice(0, 10) || ''); // Format date for input[type="date"]
  const [logo, setLogo] = useState(initialData?.logo || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !date || !logo) {
      setError('All fields are required.');
      return;
    }
    onSubmit({ name, date, logo }, initialData?.id);
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
            <label htmlFor="logo">Logo URL:</label>
            <input
              type="text"
              id="logo"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
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
