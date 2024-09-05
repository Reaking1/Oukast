import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


dotenv.config();
const secretKey = process.env.JWT_SECRET!;

interface User {
    _id: string;
    role: 'admin' | 'super admin';
    // Add any other properties that might be part of the user object
}

export interface AuthenticatedRequest extends Request {
    user?: User; 
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        if (typeof decoded === 'object' && 'id' in decoded && 'role' in decoded) {
            req.user = decoded as User;
        } else {
            return res.status(401).json({message: 'Inavid token structre'})
        }
        next();
    } catch (error) {
       if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired'})
       } else {
        return res.status(401).json({ message: 'Invail token'})
       }
    }
};
