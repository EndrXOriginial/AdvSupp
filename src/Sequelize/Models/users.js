const Sequelize = require("sequelize");
const sequelize = require('../Database/config');

module.exports = sequelize.define('users', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    username: {
        field: 'username',
        type: Sequelize.STRING
    },
    email: {
        field: 'email',
        type: Sequelize.STRING
    },
    password: {
        field: 'password',
        type: Sequelize.STRING
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.STRING
    },
    lastLogin: {
        field: 'last_login',
        type: Sequelize.TIME
    }
});