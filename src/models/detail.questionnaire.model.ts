import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class DetailQuestionnaire extends Model {
  id!: string;
  questionnaire_id!: string;
  question_id!: string;
  answer!: string;
}

DetailQuestionnaire.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    questionnaire_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'DetailQuestionnaire',
    tableName: 'detail_questionnaires',
  }
);

export default DetailQuestionnaire;