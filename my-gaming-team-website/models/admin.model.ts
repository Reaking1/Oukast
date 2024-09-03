import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt'
export interface IAdmin extends Document {
    email: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
    role: 'admin' | 'super admin';
    password: string;
}

const AdminSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    role: { type: String, enum: ['admin', 'super admin'], required: true },
    password: { type: String, required: true}
});

// hash the password before saving
AdminSchema.pre('save', async function (next) {
    const admin = this as unknown as IAdmin;
    
    if (!admin.isModified('password')) return next();

    const salt = bcrypt.genSaltSync(10);
    admin.password =  bcrypt.hashSync(admin.password, salt);

    next()
})

export default mongoose.model<IAdmin>('Admin', AdminSchema);
