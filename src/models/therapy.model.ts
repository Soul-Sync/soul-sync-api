import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Theraphy extends Model {
  id!: string;
  name!: string;
}

Theraphy.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Theraphy',
    tableName: 'teraphies',
  }
);

export default Theraphy;