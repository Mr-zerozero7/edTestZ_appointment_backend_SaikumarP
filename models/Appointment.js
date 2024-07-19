const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/User');


const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    favourite:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userId:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});

User.hasMany(Appointment, {foreignKey: 'userId'});
Appointment.belongsTo(User, {foreignKey: 'userId'});

module.exports = Appointment;