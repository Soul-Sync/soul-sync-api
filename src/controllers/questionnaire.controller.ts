import { Request, Response, RequestHandler } from 'express';
import { handleServerError } from '../utils/error.util';
import { DetailQuestionnaire, Music, MusicRecommendation, Questionnaire, Theraphy, TheraphyRecommendation, sequelize } from '../models';
import { Op, Sequelize } from 'sequelize';
import { fetchQuestionnaireWithRelations } from '../utils/questionnaire.util';

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
        const questionnaire = await fetchQuestionnaireWithRelations(id);
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
    catch {
        handleServerError(res, 'Server error');
    }
};

export const store: RequestHandler = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { answer } = req.body;
        const user_id = req.user?.id;

        // check if the user has filled out the questionnaire today
        const checkQuestionnaire = await Questionnaire.findOne({
            where: {
                user_id,
                date: {
                    [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
                    [Op.lt]: new Date(new Date().setHours(23, 59, 59, 999))
                }
            }
        });

        if (checkQuestionnaire) {
            res.status(400).json({
                status: 'error',
                message: 'You have already filled out the questionnaire today',
                payload: null
            });
            return;
        }

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
        if (answer.length > 0) {
            for (const a of answer) {
                await DetailQuestionnaire.create(
                    {
                        questionnaire_id: questionnaire.id,
                        question_id: a.id,
                        answer: a.option
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
        const music_recommendation = await Music.findAll({
            order: Sequelize.literal('rand()'),
            limit: 5
        });

        const theraphy_recommendation = await Theraphy.findAll({
            order: Sequelize.literal('rand()'),
            limit: 5
        });

        const storeMusicRecommendation = MusicRecommendation.bulkCreate(
            music_recommendation.map(({ id }) => ({
                questionnaire_id: questionnaire.id,
                music_id: id
            })),
            { transaction }
        );

        const storeTheraphyRecommendation = TheraphyRecommendation.bulkCreate(
            theraphy_recommendation.map(({ id }) => ({
                questionnaire_id: questionnaire.id,
                therapy_id: id
            })),
            { transaction }
        );

        await Promise.all([storeMusicRecommendation, storeTheraphyRecommendation]);

        await transaction.commit();

        const questionnaireData = await fetchQuestionnaireWithRelations(questionnaire.id);

        res.status(201).json({
            status: 'success',
            message: 'Questionnaire successfully created',
            payload: {
                questionnaire: questionnaireData
            }
        });
        return;

    } catch (error) {
        await transaction.rollback();
        handleServerError(res, error as Error);
    }
};