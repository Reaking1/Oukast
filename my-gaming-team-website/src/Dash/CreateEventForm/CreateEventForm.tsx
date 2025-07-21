import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { EventService } from "@/services/eventService";

interface Props {
  createdBy: string;
}

const CreateEventForm: React.FC<Props> = ({ createdBy }) => {
  const [form, setForm] = useState({
    eventName: '',
    description: '',
    location: '',
    date: '',
    image: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setForm(prev => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
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
    formData.append('createdBy', createdBy);

    try {
      await EventService.createEvent(formData);
      toast.success("✅ Event submitted for approval!");
      setForm({ eventName: '', description: '', location: '', date: '', image: null });
      setPreviewUrl(null);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`❌ Failed to submit: ${errorMessage}`);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 shadow-md border border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">📅 Create New Event</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          name="eventName"
          placeholder="Event Name"
          value={form.eventName}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Event Description"
          value={form.description}
          onChange={handleChange}
        />
        <Input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <Input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
        <Input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {previewUrl && (
          <div className="rounded-lg overflow-hidden border border-muted">
            <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover" />
          </div>
        )}

        <Button onClick={handleSubmit} className="w-full bg-black hover:bg-gray-800 text-white font-semibold">
          🚀 Submit for Approval
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateEventForm;
