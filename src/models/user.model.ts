import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database'; // Pastikan nama variabel sesuai dengan file

class User extends Model {
  public id!: string;
  public email!: string;
  public password!: string;
  public nama?: string;
  public date_of_birth?: Date;
  public gender?: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['male', 'female']],
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

export default User;
