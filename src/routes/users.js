const { getUserByEmail } = require('../controllers/users');
const routerUser = require('express').Router()


routerUser.get('/profile', async (req, res) => {
    try {

        const data = await getUserByEmail(req.user.email)
        await data.reload();
        const user = {
            id: data.id,
            email: data.email,
        }
        res.status(200).json(user)
        console.log(user)

    } catch (error) {

        console.log(error);
        res.status(500).json(error.message)


    }


})

module.exports = routerUser

// userRouter.post('/favorites/:characterId', async (request, response) => {
//     try {
//         //hay que pasarlo en body en vez de en params?
//         const {characterId} = request.params
//         const {user, isAdded} = await toggleTaskToFavorite({
//             id: request.user.id,
//             characterId
//         }) 
//         // if (user === undefined) {
//         //     response.status(200).json('Data no exist in data base')     
//         // }
//         if (isAdded) {
//         response.status(200).json('Data inserted succesfully')
//         } else {
//             response.status(200).json('Favorite deleted ok')
//         } 
//     } catch (error) {
//         if (error.message === 'No exists data in database') {
//         response.status(400).json(error.message)
//         } else {
//             response.status(500).json('No exists data in database')
//         }
//     }
// })

// userRouter.get('/favorites/:characterId', async (request, response) => {
//     try {
//         const {characterId} = request.params
//         const user = await getUserById(characterId)
//         const favorites = user.favorites
//         response.status(200).json(favorites)
//     } catch (error) {
//         response.status(500).json('Cannot get favorites')
//     }
// })

// module.exports = userRouter