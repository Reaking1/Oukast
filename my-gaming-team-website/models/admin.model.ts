import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
    email: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
    role: 'admin' | 'super admin';
}

const AdminSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    role: { type: String, enum: ['admin', 'super admin'], required: true },
});

export default mongoose.model<IAdmin>('Admin', AdminSchema);
