import express, { Response } from 'express';
import Admin from '../models/admin.model';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/authMiddleware';

const router = express.Router();

// Create Admin Route
router.post('/admins', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user || req.user.role !== 'super admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const { email, name, surname, dateOfBirth, role } = req.body;
    try {
        const newAdmin = new Admin({ email, name, surname, dateOfBirth, role });
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
