import sequelize from '../config/database';
import Questionnaire from './questionnaire.model';
import User from './user.model';
import MusicRecommendation from './music.recommendation.model';
import TheraphyRecommendation from './therapy.recommendation.model';
import Theraphy from './therapy.model';
import Music from './music.model';
import DetailQuestionnaire from './detail.questionnaire.model';
import Question from './question.model';

Questionnaire.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

Questionnaire.hasMany(DetailQuestionnaire, {
  foreignKey: 'questionnaire_id',
  as: 'detail_questionnaire',
});

Questionnaire.hasMany(MusicRecommendation, {
  foreignKey: 'questionnaire_id',
  as: 'music_recommendation',
});

Questionnaire.hasMany(TheraphyRecommendation, {
  foreignKey: 'questionnaire_id',
  as: 'theraphy_recommendation',
});

MusicRecommendation.belongsTo(Music, {
  foreignKey: 'music_id',
  as: 'music',
});

TheraphyRecommendation.belongsTo(Theraphy, {
  foreignKey: 'therapy_id',
  as: 'therapy',
});

Question.hasMany(DetailQuestionnaire, {
  foreignKey: 'question_id',
  as: 'detail_questionnaire',
});

Music.hasMany(MusicRecommendation, {
  foreignKey: 'music_id',
  as: 'music_recommendation',
});

Theraphy.hasMany(TheraphyRecommendation, {
  foreignKey: 'theraphy_id',
  as: 'theraphy_recommendation',
});

export {
  sequelize,
  User,
  Questionnaire,
  DetailQuestionnaire,
  Question,
  Music,
  Theraphy,
  MusicRecommendation,
  TheraphyRecommendation,
};
