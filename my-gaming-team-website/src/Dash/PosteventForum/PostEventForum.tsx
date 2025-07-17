import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner"; // ✅ Import toast, NOT Toaster

const PostEventForm: React.FC<{ onSubmitSuccess?: () => void }> = ({ onSubmitSuccess }) => {


  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    location: "",
    date: "",
    image: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an image");
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append("eventName", formData.eventName);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("date", formData.date);
    data.append("image", formData.image);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/events", data, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

       toast.success("Event submitted for approval!"); // ✅ Use toast.success

      setFormData({ eventName: "", description: "", location: "", date: "", image: null });
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      console.error("Event submission failed:", err);
       toast.error("Failed to submit event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Event Name</Label>
        <Input
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Location</Label>
        <Input
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Date</Label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Upload Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Event"}
      </Button>
    </form>
  );
};

export default PostEventForm;
