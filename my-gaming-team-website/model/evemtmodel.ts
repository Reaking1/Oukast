import mongoose, { Schema } from "mongoose";

export interface EventDocument extends Document {
    name: string;
    date: Date;
    description: string;
    location: string;
    imageUrl: string;
    adminId: mongoose.Types.ObjectId;
}

const eventSchema = new Schema ({
    name: {type: String, required: true},
    date: {type: Date, required:true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    imageUrl: {type: String, required: true},
    adminId: { type: mongoose.Types.ObjectId, ref: 'Admin', require: true}
});


export const Event = mongoose.model<EventDocument>('Event', eventSchema)