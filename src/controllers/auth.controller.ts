import Joi from 'joi';
import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { generateToken } from '../utils/jwt.util';
import { handleResponse, handleServerError, handleSuccess } from '../utils/response.util';
import { HttpStatusCode } from '../enum/httpStatusCode';

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const validationSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = validationSchema.validate(req.body);
    if (error) {
        handleResponse(res, HttpStatusCode.BAD_REQUEST, {
            status: 'error',
            message: error.message,
        });
        return;
    }

    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {

            handleResponse(res, HttpStatusCode.BAD_REQUEST, {
                status: 'error',
                message: 'User already exists',
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        handleSuccess(res, 'User created successfully', {
            user: {
                name,
                email,
                password: hashedPassword
            }
        }, HttpStatusCode.CREATED);

    } catch (error) {
        handleServerError(res, error as Error);
    }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ status: 'error', message: 'Invalid email or password' });
            return;
        }

        const token = generateToken({ id: user.id, email: user.email });

        handleSuccess(res, "Login successful", {
            token: token,
            token_type: 'Bearer',
            user: {
                ...user.get({ plain: true }),
                password: undefined,
            }
        });

    } catch (error) {
        handleServerError(res, error as Error);
    }
};