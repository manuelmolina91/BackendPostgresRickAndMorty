const db = require('../models')
const Character = db.Character

const getCharacterList = async () => {
    const character = await Character.findAll()
    return character
}

const getCharacterById = async (id) => {
    const character = await Character.findByPK(id)
    return character
}

const createCharacter = async ({ name }) => {
    const character = await Character.create({ name })
    return character
}

const updateCharacter = async (id, data) => {
    const character = await Character.update(data, {
        where: {
            id 
        }
    })
    return character
}

const removeCharacter = async (id) => {
    await Character.destroy({
        where: {
            id
        }
    })

    return true
}

module.exports = {
    getCharacterList,
    getCharacterById,
    createCharacter,
    updateCharacter,
    removeCharacter
}