import rateLimit from "express-rate-limit";

export const globalRateLimiter = (windowMs: number, max: number) => rateLimit({
    windowMs: windowMs || 15 * 60 * 1000,
    max: max || 5,
    message: 'Too many requests, please try again later',
    handler: (req, res) => {
        res.status(429).json({ message: 'Too many requests, please try again later after 15 minutes', status: 'error' });
    }
});

export const authRateLimiter = (windowMs: number, max: number) => rateLimit({
    windowMs: windowMs || 1000 * 60,
    max: max || 4,
    message: 'Too many requests, please try again later',
    handler: (req, res) => {
        res.status(429).json({ message: 'Too many requests, please try again later after 1 minute', status: 'error' });
    }
});