const Sequelize = require('sequelize')
const db = require('../services/db-legacy')

const Location = db.define('location', {
    id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4, 
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dimension: {
        type: Sequelize.STRING,
        allowNull: false
    }
},)

module.exports = Location