import { Sequelize } from 'sequelize';

const connection = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
  host: process.env.DB_HOST!,
  dialect: 'mysql',
});

export default connection;
