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
        res.status(400).json({ status : 'error', message: error.message });
        return;
    }

    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            res.status(400).json({ status: 'error', message: 'User already exists',  });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
        });

    } catch {
        handleServerError(res, "Failed to create user");
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
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            payload: {
                token: token,
                token_type: 'Bearer',
                user: {
                    ...user.get({ plain: true }),
                    password: undefined,
                }
            }
        });

    } catch {
        handleServerError(res, "Failed to login");
    }
};