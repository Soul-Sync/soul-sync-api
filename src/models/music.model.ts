import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Music extends Model {
  id!: string;
  title!: string;
  artist!: string;
  thumbnail!: string;
  link!: string;
}

Music.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Music',
    tableName: 'musics',
  }
);

export default Music;