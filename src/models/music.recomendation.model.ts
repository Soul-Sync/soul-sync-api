import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class MusicRecomendation extends Model {
  id!: string;
  music_id!: string;
  kuesioner_id!: string;
}

MusicRecomendation.init(
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
    kuesioner_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'MusicRecomendation',
    tableName: 'music_recomendations',
  }
);

export default MusicRecomendation;