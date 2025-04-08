const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.SQL_DB,
  process.env.SQL_USER,
  process.env.SQL_PASS,
  {
    host: process.env.SQL_HOST,
    dialect: 'postgres',
    logging: false
  }
);

module.exports = sequelize;
