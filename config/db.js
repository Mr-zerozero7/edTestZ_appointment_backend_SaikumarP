const {Sequelize} = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,
    process.env.PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: 5432,
    }
);

console.log(process.env.DB_NAME)

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
