
const db = require('../models')
const Episode = db.Episode

const getEpisodeList = async () => {
    const episode = await Episode.findAll()
    return episode
}

const getEpisodeById = async (id) => {
    const episode = await Episode.findByPK(id)
    return episode
}

const createEpisode = async ({ name }) => {
    const episode = await Episode.create({ name })
    return episode
}

const updateEpisode = async (id, data) => {
    const episode = await Episode.update(data, {
        where: {
            id 
        }
    })
    return episode
}

const removeEpisode = async (id) => {
    await Episode.destroy({
        where: {
            id
        }
    })

    return true
}

module.exports = {
    getEpisodeList,
    getEpisodeById,
    createEpisode,
    updateEpisode,
    removeEpisode
}