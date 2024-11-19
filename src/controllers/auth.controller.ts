import Joi from 'joi';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const register = async (req: Request, res: Response) => {
    const validationSchema = Joi.object({
        name : Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = validationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const { name, email, password } = req.body;

    try {
        // Check if user exists
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: 'User registered' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

// Fungsi untuk login
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      // Mencari user berdasarkan email
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Membandingkan password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Membuat JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );
  
      res.json({
        message: 'Login successful',
        token,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };

