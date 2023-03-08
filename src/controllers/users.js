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

const toggleCharacterToFav = async ({ userId, characterId }) => {
    let user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password', 'salt'] },
      include: {
        model: db.Character,
        as: 'favorites',
      },
    })
  
    let currentFavList = (user.favorites || []).map((item) => item.id)
    const existed = currentFavList.includes(characterId)
    let isAdded = false
  
    if (!existed) {
      const character = await Character.findOne({
        where: { id: characterId },
      })
  
      if (!character) {
        throw new Error('Character not found')
      }
  
      await user.addFavorites(character)
      user = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password', 'salt'] },
        include: {
          model: db.Character,
          as: 'favorites',
        },
      })
  
      currentFavList = (user.favorites || []).map((item) => item.id)
      isAdded = true
    } else {
      const newList = currentFavList.filter((item) => item !== characterId)
      await user.setFavorites(newList)
      user = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password', 'salt'] },
        include: {
          model: db.Character,
          as: 'favorites',
        },
      })
  
      currentFavList = (user.favorites || []).map((item) => item.id)
      isAdded = false
    }
  
    const characters = await Character.findAll({
      where: { id: currentFavList },
    })
  
    user.favorites = characters
  
    return { user, isAdded }
  }

module.exports = {
    toggleCharacterToFav,
    getUserByEmail,
    getUserById
}