import Joi from 'joi';
import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { generateToken } from '../utils/jwt.util';
import { handleServerError } from '../utils/error.util';

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const validationSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = validationSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.message });
        return;  // Ensure the function exits after sending a response
    }

    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            res.status(400).json({ message: 'User already exists', status: 'error' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            message: 'User created successfully',
            status: 'success',
        });

    } catch (error) {
        handleServerError(res, error as Error);
    }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(400).json({ message: 'Invalid email or password', status: 'error' });
            return;  // Ensure the function exits after sending a response
        }

        const token = generateToken({ id: user.id, email: user.email });
        res.status(200).json({
            message: 'Login successful',
            status: 'success',
            payload: {
                token: token,
                token_type: 'Bearer',
                user: {
                    ...user.get({ plain: true }),
                    password: undefined,
                }
            }
        });

    } catch (error) {
        handleServerError(res, error as Error);
    }
};