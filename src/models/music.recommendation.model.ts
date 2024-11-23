import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Music from './music.model';

class MusicRecommendation extends Model {
  id!: string;
  music_id!: string;
  questionnaire_id!: string;
  music!: Music;
}

MusicRecommendation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    music_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    questionnaire_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'MusicRecommendation',
    tableName: 'music_recommendations',
  }
);

export default MusicRecommendation;