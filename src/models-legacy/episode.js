const { STRING } = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../services/db')

const Episode = db.define('character', {
    id: {
        type: Sequelize.UUIDV4,
         defaultValue: Sequelize.UUIDV4, 
        primaryKey: true
    },
    episodeId: {
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    air_date: {
        type: Sequelize.STRING,
        allowNull:false
    },
    episode: {
        type: Sequelize.STRING,
        allowNull:false
    }
},)

module.exports = Episode

