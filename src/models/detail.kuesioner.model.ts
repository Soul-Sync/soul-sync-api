import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class DetailKuesioner extends Model {
  id!: string;
  kuesioner_id!: string;
  question_id!: string;
  answer!: string;
}

DetailKuesioner.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    kuesioner_id: {
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
    modelName: 'DetailKuesioner',
    tableName: 'detail_kuesioners',
  }
);

export default DetailKuesioner;