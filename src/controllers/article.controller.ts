import { Request, Response, RequestHandler } from 'express';
import {  handleServerError, handleSuccess } from '../utils/response.util';
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

        handleSuccess(res, 'Article successfully retrieved', {
            article: article
        });
        
    } catch (error) {
        handleServerError(res, error as Error);
    }
    
};

export const show: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const article = await Article.findByPk(id);

        handleSuccess(res, 'Article successfully retrieved', {
            article: article
        });
    } catch (error) {
        handleServerError(res, error as Error);
    }
}