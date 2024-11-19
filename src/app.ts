
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import connection from './config/database';
import authRoutes from './routes/auth.route';

import { globalRateLimiter } from './middlewares/rate-limiter.middleware';

const app = express();
app.use(express.json());

app.use(globalRateLimiter(15 * 60 * 1000, 5));

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connection.sync().then(() => console.log('Database connected!'));
