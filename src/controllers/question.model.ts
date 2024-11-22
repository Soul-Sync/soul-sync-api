import { Request, Response, RequestHandler } from 'express';
import { handleServerError } from '../utils/error.util';
import { Question } from '../models';

export const index: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const question = await Question.findAll();

        res.status(200).json({
            status: 'success',
            message: 'Question successfully retrieved',
            payload: {
                question
            }
        });
    } catch {
        handleServerError(res, 'Server error');
    }
}