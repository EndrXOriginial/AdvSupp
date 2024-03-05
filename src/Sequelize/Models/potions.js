const Sequelize = require("sequelize");
const sequelize = require('../Database/config');

module.exports = sequelize.define('potions', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        field: 'name',
        type: Sequelize.STRING
    },
    description: {
        field: 'description',
        type: Sequelize.STRING
    },
    difficulty: {
        field: 'difficulty',
        type: Sequelize.STRING
    }
}, {timestamps: false});