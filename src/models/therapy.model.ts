import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Teraphy extends Model {
  id!: string;
  name!: string;
}

Teraphy.init(
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
    modelName: 'Teraphy',
    tableName: 'teraphies',
  }
);

export default Teraphy;