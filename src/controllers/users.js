const db = require('../models')
const User = db.User
const Character = db.Character

const getUserById = async (id) => {
    const user = await User.findByPK(id)
    return user
}
const getUserByEmail = async (email) => {
    return await User.findOne({ where: { email: email } })
}
const toggleTaskToFavorite = async ({ id, characterId }) => {
    let user = await User.findByPK(id)
    let currentFavList = user.get('favorites')
    let newFavsList = currentFavList.filter(() => true).map((id_) => Number(id_))

    const existed = currentFavList.includes(Number(characterId))
    // const characterDB = await Character.findByPK(characterId)
    let isAdded = false

    if (existed) {
        newFavsList = currentFavList.filter(item => Number(item) !== Number(characterId))
    } else {
        const fav = await Character.findByPK(characterId)
        if (!fav) {
            throw new Error('No exists data in database')
        } else {
            newFavsList.push(characterId)
            isAdded = true
        }
    }

    // await User.findByIdAndUpdate(id, { favorites: newFavsList})

    await User.update({ favorites: newFavsList }, { where: { id: id } })
    user = await User.findByPK(id, { attributes: { exclude: ['password', 'salt'] } })

    // let userUpdated = await getUserBy(id)
    // userUpdated = JSON.parse(JSON.stringify(userUpdated))

    // const {password, salt, ...userUpdated_} = userUpdated

    // return userUpdated_

    return { user: user, isAdded: isAdded }
}

module.exports = {
    toggleTaskToFavorite,
    getUserByEmail,
    getUserById
}