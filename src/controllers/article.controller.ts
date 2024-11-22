import { Request, Response, RequestHandler } from 'express';
import { handleServerError } from '../utils/error.util';
import Article from '../models/article.model';
import { Op, Sequelize } from 'sequelize';

export const index: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { search } = req.query;

    try {
        const article = await Article.findAll({
            attributes: ['id', 'title', 'thumbnail', 'author'],
            where: search
                ? {
                    title: {
                        [Op.like]: `%${search}%`
                    }
                }
                : undefined,
            limit: 10,
            order: Sequelize.literal('RAND()'),
        });


        res.status(200).json({
            status: 'success',
            message: 'Article successfully retrieved',
            payload: {
                article
            }
        });
        return;
        
    } catch {
        handleServerError(res, 'Server error');
    }
    
};

export const show: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const article = await Article.findByPk(id);

        if (!article) {
            res.status(404).json({
                status: 'error',
                message: 'Article not found',
                payload: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Article successfully retrieved',
            payload: {
                article
            }
        });
    } catch {
        handleServerError(res, 'Server error');
    }
}