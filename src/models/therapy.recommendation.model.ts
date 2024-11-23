import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Theraphy from './therapy.model';

class TherapyRecommendation extends Model {
  id!: string;
  therapy_id!: string;
  questionnaire_id!: string;
  therapy!: Theraphy
}

TherapyRecommendation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    therapy_id: {
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
    modelName: 'TherapyRecommendation',
    tableName: 'therapy_recommendations',
  }
);

export default TherapyRecommendation;