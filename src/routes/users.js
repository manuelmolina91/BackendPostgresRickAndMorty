const {
    getUserByEmail,
    toggleTaskToFavoriteCharacter,
    toggleTaskToFavoriteLocation,
    toggleTaskToFavoriteEpisode,
    getUserById
} = require('../controllers/users');
const routerUser = require('express').Router();

routerUser.get('/profile', async (req, res) => {
    try {
        const data = await getUserByEmail(req.user.email);
        await data.reload();
        const user = {
            id: data.id,
            email: data.email,
            name: data.name,
        };
        res.status(200).json(user);
        console.log(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
});
routerUser.post(
    '/favoritesCharacter/:characterId',
    async (request, response) => {
        try {
            //hay que pasarlo en body en vez de en params?
            const { characterId } = request.params;
            const userID = request.user.id;
            const { user, isAdded } = await toggleTaskToFavoriteCharacter(
                userID,
                characterId
            );

            if (isAdded) {
                response.status(200).json('Favorite added ok');
            } else {
                response.status(200).json('Favorite deleted ok');
            }
        } catch (error) {
            if (error.message === 'No exists data in database') {
                response.status(400).json(error.message);
            } else {
                response.status(500).json('No exists data in database');
            }
        }
    }
);

routerUser.post('/favoritesLocation/:locationId', async (request, response) => {
    try {
        const { locationId } = request.params;
        const { user, isAdded } = await toggleTaskToFavoriteLocation(
            request.user.id,
            locationId
        );
        if (isAdded) {
            response.status(200).json('Favorite added ok');
        } else {
            response.status(200).json('Favorite deleted ok');
        }
    } catch (error) {
        if (error.message === 'No exists data in database') {
            response.status(400).json(error.message);
        } else {
            response.status(500).json('No exists data in database');
        }
    }
});

routerUser.post('/favoritesEpisode/:episodeId', async (request, response) => {
    try {
        //hay que pasarlo en body en vez de en params?
        const { episodeId } = request.params;
        const { user, isAdded } = await toggleTaskToFavoriteEpisode(
            request.user.id,
            episodeId
        );
        if (isAdded) {
            response.status(200).json('Favorite added ok');
        } else {
            response.status(200).json('Favorite deleted ok');
        }
    } catch (error) {
        if (error.message === 'No exists data in database') {
            response.status(400).json(error.message);
        } else {
            response.status(500).json('No exists data in database');
        }
    }
});

routerUser.get('/favorites/:characterId', async (request, response) => {
    try {
        const { characterId } = request.params;
        const user = await getUserById(characterId);
        const favorites = user.favoritesCharacters
        console.log(favorites);
        response.status(200).json(favorites);
    } catch (error) {
        response.status(500).json('Cannot get favorites');
    }
});
module.exports = routerUser;

// module.exports = userRouter
