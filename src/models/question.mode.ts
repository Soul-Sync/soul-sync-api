import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Question extends Model {
  id!: string;
  question!: string;
}

Question.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
  }
);

export default Question;