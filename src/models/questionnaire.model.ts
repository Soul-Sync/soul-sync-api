import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import MusicRecommendation from './music.recommendation.model';
import TheraphyRecomendation from './therapy.recommendation.model';

class Questionnaire extends Model {
  id!: string;
  user_id!: string;
  date!: Date;
  status!: string;
  music_recommendation!: MusicRecommendation[];
  theraphy_recommendation!: TheraphyRecomendation[];
}

Questionnaire.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Questionnaire',
    tableName: 'questionnaires',
  }
);

export default Questionnaire;