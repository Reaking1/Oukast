import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EventService } from "@/services/eventService";
import { EventUpdateData } from "@/Types/Event";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";






interface EditEventFormProps {
    event: EventUpdateData;
    onClose: () => void;
    onSave: () => void;
}

const EditEventForm: React.FC<EditEventFormProps> = ({ event, onClose, onSave}) => {
    const [formData, setFormData] = useState<EventUpdateData>(event);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, imageName:file}));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!formData._id) return;

        const updatedData = new FormData();
        for(const key in formData) {
            const value = formData[key as keyof EventUpdateData];
            if(value !== undefined && value !== null){
                updatedData.append(key, value as string | Blob)
            }
        }
        try {
            await EventService.updateEvent(formData._id, updatedData);
            toast.success('Event update successfully!');
            onSave();
            onClose()
        } catch (err) {
            toast.error("Failed to update event");
        }
    };

   return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded-md">
       <Input name="eventName" value={formData.eventName ?? ''} onChange={handleChange} placeholder="Event Name" />
      <Textarea name="description" value={formData.description ?? ''} onChange={handleChange} placeholder="Description" />
      <Input name="location" value={formData.location ?? ''} onChange={handleChange} placeholder="Location" />
      <Input name="date" type="date" value={formData.date ?? ''} onChange={handleChange} />
      <Input type="file" onChange={handleFileChange} />
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
   );

}

export default EditEventForm