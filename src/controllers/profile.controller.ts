import Joi from 'joi';
import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { handleResponse, handleServerError, handleSuccess } from '../utils/response.util';
import { HttpStatusCode } from '../enum/httpStatusCode';
import { decodeBase64, uploadFileToBucket } from '../utils/upload.util';

export const index: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const user = req.user;

    try {
        const user = await User.findOne({
            where: { id: req.user?.id },
            attributes: { exclude: ['password'] },
        });
        handleSuccess(res, 'Profile successfully retrieved', {
            user: user
        });
    } catch (error) {
        handleServerError(res, error as Error);
    }
}

export const update: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { name, date_of_birth, gender, avatar, password } = req.body;

    const validationSchema = Joi.object({
        name: Joi.string().allow(null, '').optional(),
        date_of_birth: Joi.date().optional(),
        gender: Joi.string().valid('Laki-laki', 'Perempuan').optional(),
        avatar: Joi.string().allow(null, '').optional(),
        password: Joi.string().allow(null, '').optional(),
    });

    const { error } = validationSchema.validate(req.body);

    if (error) {
        handleResponse(res, HttpStatusCode.BAD_REQUEST, {
            status: 'error',
            message: error.message,
        });
        return;
    }

    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const updateData: Record<string, any> = {
            name,
            date_of_birth,
            gender,
        };

        if (avatar) {
            const { filename, buffer } = await decodeBase64(avatar);
            const publicUrl = await uploadFileToBucket(buffer, filename);
            updateData.avatar = publicUrl;
        }

        if (hashedPassword) {
            updateData.password = hashedPassword;
        }

        await User.update(updateData, {
            where: { id: req.user?.id },
        });

        const updatedUser = await User.findOne({
            where: { id: req.user?.id },
            attributes: { exclude: ['password'] },
        });

        handleSuccess(res, 'Profile successfully updated', {
            user: updatedUser,
        });
    } catch (error) {
        handleServerError(res, error as Error);
    }
};
