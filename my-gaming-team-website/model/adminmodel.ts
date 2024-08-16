import mongoose, { Document, Schema } from 'mongoose'


export interface AdminDocument extends Document {
    email: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
}


const adminSchema: Schema = new Schema({
    email: {type: String, required: true, unique:true},
    name: {type: String, required:true},
    surname: {type: String, required:true},
    dateOfBirth: {type: Date, required: true}
});

export const Admin = mongoose.model<AdminDocument>('Admin', adminSchema)