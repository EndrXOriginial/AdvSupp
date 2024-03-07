const Sequelize = require("sequelize");
const sequelize = require('../Database/config');

module.exports = sequelize.define('users', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        field: 'username',
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: 'A username is required'
            }
        },
        unique: true
    },
    email: {
        field: 'email',
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        field: 'password',
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.STRING,
        allowNull: false
    },
    lastLogin: {
        field: 'last_login',
        type: Sequelize.TIME
    }
}, {updatedAt: false});