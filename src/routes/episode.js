const router = require('express').Router()
const { getEpisodeList, getEpisodeById, createEpisode, updateEpisode, removeEpisode } = require('../controllers/episode')


router.get('/', async (request, response) => {
    try {
        const episode = await getEpisodeList()
        response.status(200).json(episode)
    } catch (error) {
        response.status(500)
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const episode = await getEpisodeById(id)
        response.status(200).json(episode)
    } catch (error) {
        response.status(500)
    }
})

router.post('/', async (request, response) => {
    try {
        const data = request.body
        const episode = await createEpisode(data)
        response.status(200).json(episode)
    } catch (error) {
        response.status(500)
    }
})

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const data = request.body
        const episode = await updateEpisode(id, data)
        response.status(200).json(episode)
    } catch (error) {
        response.status(500)
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        await removeEpisode(id)
        response.status(200).json(true)
    } catch (error) {
        response.status(500)
    }
})

module.exports = router