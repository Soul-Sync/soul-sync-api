import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

// Rute untuk register
router.post('/register', register);

// Rute untuk login
router.post('/login', login);

export default router;
