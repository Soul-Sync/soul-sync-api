
import express from 'express';
import dotenv from 'dotenv';
import connection from './config/database';
import authRoutes from './routes/auth.route';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connection.sync().then(() => console.log('Database connected!'));
