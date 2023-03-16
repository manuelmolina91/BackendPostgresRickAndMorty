const models = require('../models');
const Character = models.Character;

const getCharacterList = async () => {
    const character = await models.Character.findAll({
        order: [['id', 'DESC']],
    });
    return character;
};

const getCharacterBySpecies = async () => {
    const species = await models.Character.findAll({
        order: [['species', 'DESC']],
        distinct: true,
        group: ['species'],
        attributes: {
            exclude: [
                'id',
                'character_id',
                'name',
                'status',
                'image',
                'createdAt',
                'updatedAt',
            ],
        },
    });
    return species;
};

const getCharacterById = async (id) => {
    const character = await models.Character.findOne({
        where: { id },
    });
    return character;
};

const createCharacter = async ({ name }) => {
    const character = await models.Character.create({ name });
    return character;
};

const updateCharacter = async (id, data) => {
    const character = await models.Character.update(data, {
        where: {
            id,
        },
    });
    return character;
};

const removeCharacter = async (id) => {
    await models.Character.destroy({
        where: {
            id,
        },
    });

    return true;
};

module.exports = {
    getCharacterList,
    getCharacterById,
    createCharacter,
    updateCharacter,
    removeCharacter,
    getCharacterBySpecies,
};
