import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { authRateLimiter } from './../middlewares/rate-limiter.middleware';

const router = Router();

// Rute untuk register
router.post('/register', register);

// Rute untuk login
router.post('/login', authRateLimiter(1000 * 60, 4), login);

export default router;
