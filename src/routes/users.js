const userRouter = require('express').Router()
const { toggleTaskToFavorite, getUserById } = require('../controllers/users')

userRouter.post('/favorites/:characterId', async (request, response) => {
    try {
        //hay que pasarlo en body en vez de en params?
        const {characterId} = request.params
        const {user, isAdded} = await toggleTaskToFavorite({
            id: request.user.id,
            characterId
        }) 
        if (isAdded) {
        response.status(200).json('Data inserted succesfully')
        } else {
            response.status(200).json('Favorite deleted ok')
        } 
    } catch (error) {
        if (error.message === 'No exists data in database') {
        response.status(400).json(error.message)
        } else {
            response.status(500).json('No exists data in database')
        }
    }
})

userRouter.get('/favorites/:characterId', async (request, response) => {
    try {
        const {characterId} = request.params
        const user = await getUserById(characterId)
        const favorites = user.favorites
        response.status(200).json(favorites)
    } catch (error) {
        response.status(500).json('Cannot get favorites')
    }
})

module.exports = userRouter