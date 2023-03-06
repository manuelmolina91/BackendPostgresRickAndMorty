
const db = require('../models')
const Location = db.Location

const getLocationList = async () => {
    const location = await Location.findAll()
    return location
}

const getLocationById = async (id) => {
    const location = await Location.findByPK(id)
    return location
}

const createLocation = async ({ name }) => {
    const location = await Location.create({ name })
    return location
}

const updateLocation = async (id, data) => {
    const location = await Location.update(data, {
        where: {
            id 
        }
    })
    return location
}

const removeLocation = async (id) => {
    await Location.destroy({
        where: {
            id
        }
    })

    return true
}

module.exports = {
    getLocationList,
    getLocationById,
    createLocation,
    updateLocation,
    removeLocation
}