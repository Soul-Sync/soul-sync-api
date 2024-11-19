import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const payload = verifyToken(token);
        console.log('Verified Payload:', payload);
        req.user = payload;
        next();

    } catch {
        return res.status(401).json({ message: 'Invalid token or expired' });
    }
};
