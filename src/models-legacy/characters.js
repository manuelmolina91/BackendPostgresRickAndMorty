const { STRING } = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../services/db')

const Character = db.define('character', {
    id: {
        type: Sequelize.UUIDV4,
         defaultValue: Sequelize.UUIDV4, 
        primaryKey: true
    },
    characterId: {
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    species: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    }

},)

module.exports = Character