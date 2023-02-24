const router = require('express').Router()
const { getLocationList, getLocationById, createLocation, updateLocation, removeLocation } = require('../controllers/location')


router.get('/', async (request, response) => {
    try {
        const location = await getLocationList()
        response.status(200).json(location)
    } catch (error) {
        response.status(500)
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const location = await getLocationById(id)
        response.status(200).json(location)
    } catch (error) {
        response.status(500)
    }
})

router.post('/', async (request, response) => {
    try {
        const data = request.body
        const location = await createLocation(data)
        response.status(200).json(location)
    } catch (error) {
        response.status(500)
    }
})

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const data = request.body
        const location = await updateLocation(id, data)
        response.status(200).json(location)
    } catch (error) {
        response.status(500)
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        await removeLocation(id)
        response.status(200).json(true)
    } catch (error) {
        response.status(500)
    }
})

module.exports = router