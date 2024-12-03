import { Request, Response, RequestHandler } from 'express';
import { handleServerError, handleSuccess } from '../utils/response.util';
import { Question } from '../models';

export const index: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const question = await Question.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            order: [
                ['sort', 'ASC']
            ]
        });

        question.forEach((q) => {
            q.options = q.options ? JSON.parse(q.options) : null; 
        });

        handleSuccess(res, 'Question successfully retrieved', {
            question: question
        });
        
    } catch(err) {
        handleServerError(res, err as Error);
    }
}