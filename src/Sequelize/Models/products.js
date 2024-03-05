const Sequelize = require("sequelize");
const sequelize = require('./../Database/config');

module.exports = sequelize.define('products', {
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
    category: {
        field: 'category',
        type: Sequelize.STRING
    },
    price: {
        name: 'price',
        type: Sequelize.INTEGER
    },
    quantity: {
        field: 'quantity_avail',
        type: Sequelize.INTEGER
    } 
}, {timestamps: false});