import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class TeraphyRecomendation extends Model {
  id!: string;
  teraphy_id!: string;
  kuesioner_id!: string;
}

TeraphyRecomendation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    teraphy_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    kuesioner_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'TeraphyRecomendation',
    tableName: 'teraphy_recomendations',
  }
);

export default TeraphyRecomendation;