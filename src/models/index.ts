import sequelize from '../config/database';
import Questionnaire from './questionnaire.model';
import User from './user.model';
import MusicRecomendation from './music.recomendation.model';
import TeraphyRecomendation from './therapy.recomendation.model';
import Teraphy from './therapy.model';
import Music from './music.model';
import DetailQuestionnaire from './detail.questionnaire.model';
import Question from './question.mode';


Questionnaire.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

Questionnaire.hasMany(DetailQuestionnaire, {
  foreignKey: 'questionnaire_id',
  as: 'detail_questionnaire',
});

Questionnaire.hasOne(MusicRecomendation, {
  foreignKey: 'questionnaire_id',
  as: 'music_recomendation',
});

Questionnaire.hasOne(TeraphyRecomendation, {
  foreignKey: 'questionnaire_id',
  as: 'teraphy_recomendation',
});

Question.hasMany(DetailQuestionnaire, {
  foreignKey: 'question_id',
  as: 'detail_questionnaire',
});

Music.hasMany(MusicRecomendation, {
  foreignKey: 'music_id',
  as: 'music_recomendation',
});

Teraphy.hasMany(TeraphyRecomendation, {
  foreignKey: 'teraphy_id',
  as: 'teraphy_recomendation',
});

export {
  sequelize,
  User,
  Questionnaire,
  DetailQuestionnaire,
  Question,
  Music,
  Teraphy,
  MusicRecomendation,
  TeraphyRecomendation,
};
