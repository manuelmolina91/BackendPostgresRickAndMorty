const Sequelize = require('sequelize')
const db = require('../services/db')

const User = db.define('users', {
    id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
    },

    email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
    },

    password: {
        type: Sequelize.STRING,
        allowNull:false
    },

    name: {
        type: Sequelize.STRING,
        allowNull:true
    },

    salt: {
        type:Sequelize.STRING,
        allowNull:false
    },
    
})

module.exports = User


