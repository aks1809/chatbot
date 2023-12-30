import { createRequire } from 'module';
import constants from './constants.js';

const require = createRequire(import.meta.url);
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  `mysql://${constants.DB_USER}:${constants.DB_PASSWORD}@${constants.DB_DOMAIN}:${constants.DB_PORT}/${constants.DB_NAME}`,
  {
    dialect: 'mariadb',
    dialectOptions: {},
    timezone: '+05:30'
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
