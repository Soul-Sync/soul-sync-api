import Joi from 'joi';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { generateToken } from '../utils/jwt.util';
import { handleServerError } from '../utils/error.util';

export const register = async (req: Request, res: Response): Promise<Response> => {
    const validationSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = validationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists', status: 'error' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({
            message: 'User created successfully',
            status: 'success',
        });

    } catch (error) {
        return handleServerError(res, error);
    }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password', status: 'error' });
        }

        const token = generateToken({ id: user.id, email: user.email });
        return res.status(200).json({
            message: 'Login successful',
            status: 'success',
            payload: {
                token: token,
                user: {
                    ...user.get({ plain: true }),
                    password: undefined,
                }
            }
        });

    } catch (error) {
        return handleServerError(res, error);
    }
};