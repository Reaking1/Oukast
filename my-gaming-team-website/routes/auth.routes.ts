import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin, { IAdmin } from '../models/admin.model';

const router = express.Router();
const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

// Login Route
router.post('/login', async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const admin = await Admin.findOne({ email }) as IAdmin;

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, secretKey, { expiresIn: '1h' });
        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Signup Route
router.post('/signup', async (req: Request, res: Response) => {
    const { email, name, surname, dateOfBirth, role, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Convert dateOfBirth to Date object
        const dob = new Date(dateOfBirth);
        if (isNaN(dob.getTime())) {
            return res.status(400).json({ error: 'Invalid date format for dateOfBirth' });
        }

        const newAdmin = new Admin({ email, name, surname, dateOfBirth: dob, role, password });
        await newAdmin.save();

        const token = jwt.sign({ id: newAdmin._id, role: newAdmin.role }, secretKey, { expiresIn: '1h' });
        res.status(201).json({ token, admin: newAdmin });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
