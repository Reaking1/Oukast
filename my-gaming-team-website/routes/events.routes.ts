import express, { Request, Response } from 'express';
import Event from '../models/event.model';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/authMiddleware';

const router = express.Router();

// Create Event
router.post('/events', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { name, date, description, location, imageUrl } = req.body;
    try {
        const newEvent = new Event({
            name,
            date,
            description,
            location,
            imageUrl,
            createdBy: req.user._id, // `user` is now recognized and checked
        });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Read All Events
router.get('/events', authenticateJWT, async (req: Request, res: Response) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Event
router.put('/events/:id', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Event
router.delete('/events/:id', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
