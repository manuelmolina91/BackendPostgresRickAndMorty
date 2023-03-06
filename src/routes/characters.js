const router = require('express').Router()
const { request, response } = require('express')
const { getCharacterList, getCharacterById, createCharacter, updateCharacter, removeCharacter } = require('../controllers/characters')


router.get('/', async (request, response) => {
    try {
        const character = await getCharacterList()
        response.status(200).json(character)
    } catch (error) {
        response.status(500)
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const character = await getCharacterById(id)
        response.status(200).json(character)
    } catch (error) {
        response.status(500)
    }
})

router.post('/', async (request, response) => {
    try {
        const data = request.body
        const character = await createCharacter(data)
        response.status(200).json(character)
    } catch (error) {
        response.status(500)
    }
})

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const data = request.body
        const character = await updateCharacter(id, data)
        response.status(200).json(character)
    } catch (error) {
        response.status(500)
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        await removeCharacter(id)
        response.status(200).json(true)
    } catch (error) {
        response.status(500)
    }
})



module.exports = router