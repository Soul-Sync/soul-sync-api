import dotenv from 'dotenv';
dotenv.config();

import express, { response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import statusMonitor from 'express-status-monitor';
import {sequelize} from './models';

import authRoutes from './routes/auth.route';
import profileRoutes from './routes/profile.route';
import articleRoutes from './routes/article.route';
import questionRoutes from './routes/question.route';
import questionnaireRoutes from './routes/questionnaire.route';

// Rate limiter middleware
import { globalRateLimiter } from './middlewares/rate-limiter.middleware';
import { authenticate } from './middlewares/auth.middleware';
import errorHandler from './middlewares/error-handler.middleware';

// Swagger Config
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Soul Sync API',
            version: '1.0.0',
            description: `SoulSync API Documentation (Bangkit Product Based Capstone Project - C242-PS090)<br><br>
            To access the endpoints that require authorization, please set up authentication first using bearerAuth with an access token in the form of a JWT obtained from the /auth/login endpoint. <b>This API is used to integrate the Frontend with the MySQL Database</b><br><br>
            SoulSync Object Model is as follows: 
            <ul> 
                <li>Users</li>
                <li>Articles</li>
                <li>Questions</li>
                <li>Questionnaires</li>
            </ul>`,
        },
        servers : [
            {
                url:'https://bangkit-442612.et.r.appspot.com/',
                description:  'SoulSync Main API'
            },
            {
                url: 'https://soulsync-model-endpoint-451042832834.asia-southeast2.run.app/',
                description:  'Machine Learning Model API'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            responses: {
                UnauthorizedError: {    
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'error'
                                    },
                                    message: {
                                        type: 'error',
                                        example: 'Authorization header is missing'
                                    },
                                },
                            },
                        },
                    },
                },
                BadRequestError: {
                    description: 'Bad Request',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'error'
                                    },
                                    message: {
                                        type: 'string',
                                        example: "\"email\" is required"
                                    },
                                },
                            },
                        },
                    },
                },
                InternalServerError: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'error'
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Internal server error'
                                    },
                                },
                            },
                        },
                    },
                },
                NotFoundError: {
                    description: 'Not Found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'error'
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Resource not found'
                                    },
                                },
                            },
                        },
                    },
                },
                TooManyRequestsError: {
                    description: 'Too Many Requests',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'error'
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Too many requests, please try again later after 15 minutes'
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/swagger-doc/*.ts'],
};


const swaggerSpecs = swaggerJSDoc(swaggerOptions);

const app = express();
app.set('trust proxy', true);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Only use status monitor in development
if (process.env.NODE_ENV === 'development') {
    app.use(statusMonitor());
}

app.use(globalRateLimiter(15 * 60 * 1000, 100));

app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({
        title: 'Soul Sync API',
        version: '1.0.0',
        description: 'SoulSync API Documentation (Bangkit Product Based Capstone Project - C242-PS090)',
        apiDoc: '/api-doc'
    });
});

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
app.use('/auth', authRoutes);
app.use('/profile', authenticate, profileRoutes);
app.use('/article', authenticate, articleRoutes);
app.use('/question', authenticate, questionRoutes);
app.use('/questionnaire', authenticate, questionnaireRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

sequelize.sync().then(() => console.log('Database connected!'));
