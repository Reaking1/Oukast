import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin, { IAdmin } from '../models/admin.model';

const router = express.Router();
const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

// Login Route
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email }) as IAdmin;

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Password verification
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, secretKey, { expiresIn: '1h' });
        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Signup Route
router.post('/signup', async (req: Request, res: Response) => {
    console.log('Signup route hit');
    const { email, name, surname, dateOfBirth, role, password } = req.body;
    console.log('Request body:', req.body);

    try {
        const existingAdmin = await Admin.findOne({ email });
        console.log('Existing admin check:', existingAdmin);

        if (existingAdmin) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const dob = new Date(dateOfBirth);
        console.log('Date of Birth:', dob);

        if (isNaN(dob.getTime())) {
            return res.status(400).json({ error: 'Invalid date format for dateOfBirth' });
        }

        console.log('About to hash password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Password hashed successfully');

        const newAdmin = new Admin({
            email,
            name,
            surname,
            dateOfBirth: dob,
            role,
            password: hashedPassword,
        });

        await newAdmin.save();
        console.log('New admin saved:', newAdmin);

        const token = jwt.sign({ id: newAdmin._id, role: newAdmin.role }, secretKey, { expiresIn: '1h' });
        res.status(201).json({ token, admin: newAdmin });
    } catch (err) {
        console.error('Error occurred:', err.message);
        res.status(500).json({ error: err.message });
    }
});


export default router;
