import { Questionnaire, MusicRecommendation, Music, TheraphyRecommendation, Theraphy } from '../models';

export const fetchQuestionnaireWithRelations = async (id: string) => {
    return await Questionnaire.findOne({
        where: { id },
        attributes: { exclude: ['answer'] },
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
};
