const {Sequelize} = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,
    process.env.PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: 5432
    }
);

module.exports = sequelize;
