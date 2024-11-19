import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connection from './config/database';
import authRoutes from './routes/auth.route';

// Importing Swagger
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

// Rate limiter middleware
import { globalRateLimiter } from './middlewares/rate-limiter.middleware';

// Swagger Config
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Soul Sync API',
            version: '1.0.0',
            description: 'A simple CRUD API',
        },
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use(globalRateLimiter(15 * 60 * 1000, 100));

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connection.sync().then(() => console.log('Database connected!'));
