import { Request, Response, RequestHandler } from 'express';
import { handleServerError } from '../utils/error.util';
import { DetailQuestionnaire, Music, MusicRecommendation, Questionnaire, Theraphy, TheraphyRecommendation, sequelize } from '../models';
import { Op, Sequelize } from 'sequelize';

export const index: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { date } = req.query;
        const user_id = req.user?.id;
        const questionnaire = await Questionnaire.findAll({
            where: date
                ? {
                    createdAt: {
                        [Op.gte]: new Date(date as string),
                        [Op.lt]: new Date(new Date(date as string).setDate(new Date(date as string).getDate() + 1))
                    },
                    user_id: user_id
                }
                : {
                    user_id: user_id
                },
            order: [['date', 'DESC']],
            limit: 10
        });

        if (questionnaire.length === 0) {
            res.status(404).json({
                status: 'error',
                message: 'Questionnaire not found',
                payload: null
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Questionnaire successfully retrieved',
            payload: {
                questionnaire
            }
        });
        return;

    } catch {
        handleServerError(res, 'Server error');
    }
}

export const show: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const questionnaire = await Questionnaire.findOne({
            where: {
                id
            },
            include: [
                {
                    model: MusicRecommendation,
                    as: 'music_recommendation',
                    attributes: ['music_id'],
                    include: [
                        {
                            model: Music,
                            as: 'music',
                            attributes: ['id', 'title', 'artist', 'thumbnail', 'link']
                        }
                    ]
                },
                {
                    model: TheraphyRecommendation,
                    as: 'theraphy_recommendation',
                    attributes: ['therapy_id'],
                    include: [
                        {
                            model: Theraphy,
                            as: 'therapy',
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        });

        if (!questionnaire) {
            res.status(404).json({
                status: 'error',
                message: 'Questionnaire not found',
                payload: null
            });
            return;
        }

        const formattedQuestionnaire = {
            id: questionnaire.id,
            user_id: questionnaire.user_id,
            date: questionnaire.date,
            status: questionnaire.status,
            music_recommendation: questionnaire.music_recommendation?.map(({ music }) => music) || [],
            theraphy_recommendation: questionnaire.theraphy_recommendation?.map(({ therapy }) => therapy) || []
        };
        
        res.status(200).json({
            status: 'success',
            message: 'Questionnaire successfully retrieved',
            payload: {
                questionnaire: formattedQuestionnaire
            }
        });
    }
    catch (error) {
        handleServerError(res, 'Server error');
    }
};

export const store: RequestHandler = async (req, res) => {
    const transaction = await sequelize.transaction(); // Start a transaction

    try {
        const { question } = req.body;
        const user_id = req.user?.id;

        // Store the questionnaire
        const questionnaire = await Questionnaire.create(
            {
                user_id,
                date: new Date(),
                status: ['Happy', 'Sad', 'Stress'][Math.floor(Math.random() * 3)]
            },
            { transaction }
        );

        // Store the answers
        if (question.length > 0) {
            for (const q of question) {
                await DetailQuestionnaire.create(
                    {
                        questionnaire_id: questionnaire.id,
                        question_id: q.id,
                        answer: q.answer
                    },
                    { transaction }
                );
            }
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Please answer all question',
                payload: null
            });
            return;
        }

        // Store the Music Recommendation & Theraphy Recommendation


        await transaction.commit();

        res.status(201).json({
            status: 'success',
            message: 'Questionnaire successfully created',
            payload: {
                questionnaire
            }
        });
        return;

    } catch (error) {
        await transaction.rollback();
        handleServerError(res, 'Server error');
    }
};