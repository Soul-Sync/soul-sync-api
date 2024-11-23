import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import statusMonitor from 'express-status-monitor';
import {sequelize} from './models';

import authRoutes from './routes/auth.route';
import articleRoutes from './routes/article.route';
import questionRoutes from './routes/question.route';
import questionnaireRoutes from './routes/questionnaire.route';

// Rate limiter middleware
import { globalRateLimiter } from './middlewares/rate-limiter.middleware';
import { authenticate } from './middlewares/auth.middlware';

// Swagger Config
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Soul Sync API',
            version: '1.0.0',
            description: `SoulSync API Documentation (Bangkit Product Based Capstone Project - C242-PS090) <br><br>To access the endpoints that require authorization, please set up authentication first using bearerAuth with an access token in the form of a JWT obtained from the /auth/login endpoint. <b>This API is used to integrate the Frontend with the MySQL Database</b>. <br><br>SoulSync Object Model is as follows: 
            <ul> 
                <li>Users - bla bla bla</li>
            </ul>`,
        },
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// Only use status monitor in development
if (process.env.NODE_ENV === 'development') {
    app.use(statusMonitor());
}

app.use(globalRateLimiter(15 * 60 * 1000, 100));

app.get('/', (req, res) => {
    res.status(200).json({
        title: 'Soul Sync API',
        version: '1.0.0',
        description: 'A simple CRUD API',
        apiDoc: '/api-doc'
    });
});

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
app.use('/auth', authRoutes);
app.use('/article', authenticate, articleRoutes);
app.use('/question', authenticate, questionRoutes);
app.use('/questionnaire', authenticate, questionnaireRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

sequelize.sync().then(() => console.log('Database connected!'));
