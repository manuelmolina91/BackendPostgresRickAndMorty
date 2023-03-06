const { STRING } = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../services/db')

const Location = db.define('character', {
    id: {
        type: Sequelize.UUIDV4,
         defaultValue: Sequelize.UUIDV4, 
        primaryKey: true
    },
    locationId: {
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    type: {
        type: Sequelize.STRING,
        allowNull:false
    },
    dimension: {
        type: Sequelize.STRING,
        allowNull:false
    }
},)

module.exports = Location

