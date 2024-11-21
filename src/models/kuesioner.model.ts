import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Kuesioner extends Model {
  id!: string;
  user_id!: string;
  date!: Date;
  status!: string;
}

Kuesioner.init(
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
    modelName: 'Kuesioner',
    tableName: 'kuesioners',
  }
);

export default Kuesioner;