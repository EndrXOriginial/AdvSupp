const Sequelize = require("sequelize");
const sequelize = require('../Database/config');

module.exports = sequelize.define('ingredients', {
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
    rarity: {
        field: 'rarity',
        type: Sequelize.STRING
    }
}, {timestamps: false});