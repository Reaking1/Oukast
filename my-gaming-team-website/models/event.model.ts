import mongoose, { Schema, Document } from 'mongoose';
import { IAdmin } from './admin.model';

export interface IEvent extends Document {
    name: string;
    date: Date;
    description: string;
    location: string;
    imageUrl: string;
    createdBy: IAdmin['_id']; // Reference to Admin
}

const EventSchema: Schema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
});

export default mongoose.model<IEvent>('Event', EventSchema);
