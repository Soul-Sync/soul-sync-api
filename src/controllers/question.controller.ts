import { Request, Response, RequestHandler } from 'express';
import { handleServerError } from '../utils/error.util';
import { Question } from '../models';

export const index: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const question = await Question.findAll({
            order: [
                ['sort', 'ASC']
            ]
        });

        if (question.length === 0) {
            res.status(404).json({
                status: 'error',
                message: 'Question not found',
                payload: null
            });
            return;
        }

        question.forEach((q) => {
            q.options = q.options ? JSON.parse(q.options) : null; 
        });

        res.status(200).json({
            status: 'success',
            message: 'Question successfully retrieved',
            payload: {
                question
            }
        });
        return;
    } catch(err) {
        console.log(err);
        handleServerError(res, 'Server error');
    }
}