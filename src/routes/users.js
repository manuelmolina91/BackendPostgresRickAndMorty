const { getUserByEmail, toggleCharacterToFav } = require('../controllers/users');
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

routerUser.post('/character/fav', async (request, response) => {
    try {
      const req = request
      const { characterId } = request.body
      const user = await toggleCharacterToFav({
        characterId,
        userId: req.user.id,
      })
      response.status(200).json(user)
    } catch (error) {
      console.log(error)
      response.status(500).json(error.message)
    }
  })

module.exports = routerUser

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

module.exports = routerUser