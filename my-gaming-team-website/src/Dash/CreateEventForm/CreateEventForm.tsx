import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { EventService } from "@/services/eventService";

interface Props {
  createdBy: string;
}

const CreateEventForm: React.FC<Props> = ({ createdBy }) => {
  const [form, setForm] = useState({
    eventName: "",
    description: "",
    location: "",
    date: "",
    image: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!form.image) {
      toast.error("Please upload an event image.");
      return;
    }

    const formData = new FormData();
    formData.append("eventName", form.eventName);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("date", form.date);
    formData.append("image", form.image);
    formData.append("status", "pending");
    formData.append("createdBy", createdBy);

    try {
      await EventService.createEvent(formData);
      toast.success("✅ Event submitted for approval!");
      setForm({
        eventName: "",
        description: "",
        location: "",
        date: "",
        image: null,
      });
      setPreviewUrl(null);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error";
      toast.error(`❌ Failed to submit: ${errorMessage}`);
    }
  };

  return (
    <div className="w-full px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            📅 Create New Event
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Event Name */}
          <div className="space-y-1">
            <Label htmlFor="eventName">Event Name</Label>
            <Input
              id="eventName"
              name="eventName"
              placeholder="Enter the event name"
              value={form.eventName}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter a short description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Location */}
          <div className="space-y-1">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Enter event location"
              value={form.location}
              onChange={handleChange}
            />
          </div>

          {/* Date */}
          <div className="space-y-1">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-1">
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="rounded-lg overflow-hidden border border-muted bg-muted/20 p-2">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              onClick={handleSubmit}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold text-md"
            >
              🚀 Submit for Approval
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEventForm;
