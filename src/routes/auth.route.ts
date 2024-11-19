import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { authRateLimiter } from './../middlewares/rate-limiter.middleware';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login user dengan email dan password akan return access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: testing
 *     responses:
 *       '200':
 *         description: a JSON Object with User login Information and access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: success login
 *                 token:
 *                   type: string
 *                   example: "your-jwt-token"
 *       '401':
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Wrong Email / Password!
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

router.post('/register', register);

router.post('/login', authRateLimiter(1000 * 60, 4), login);

export default router;
