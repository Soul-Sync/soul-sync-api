import sequelize from '../config/database';
import Kuesioner from './kuesioner.model';
import User from './user.model';
import MusicRecomendation from './music.recomendation.model';
import TeraphyRecomendation from './therapy.recomendation.model';
import Teraphy from './therapy.model';
import Music from './music.model';
import DetailKuesioner from './detail.kuesioner.model';
import Question from './question.mode';


Kuesioner.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

Kuesioner.hasMany(DetailKuesioner, {
  foreignKey: 'kuesioner_id',
  as: 'detail_kuesioner',
});

Kuesioner.hasOne(MusicRecomendation, {
  foreignKey: 'kuesioner_id',
  as: 'music_recomendation',
});

Kuesioner.hasOne(TeraphyRecomendation, {
  foreignKey: 'kuesioner_id',
  as: 'teraphy_recomendation',
});

Question.hasMany(DetailKuesioner, {
  foreignKey: 'question_id',
  as: 'detail_kuesioner',
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
  Kuesioner,
  DetailKuesioner,
  Question,
  Music,
  Teraphy,
  MusicRecomendation,
  TeraphyRecomendation,
};
