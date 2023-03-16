'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Character extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Character.belongsToMany(models.User, {
                through: 'userFavoritesCharacters',
                as: 'favoritesCharacters',
                foreignKey: 'character_FK',
                onDelete: 'cascade',
            });
            models.Character.belongsToMany(models.Episode, {
                through: 'charactersEpisodes',
                as: 'episodesOfCharacter',
                foreignKey: 'character_FK',
                onDelete: 'cascade',
            });
        }
    }
    Character.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            character_id: {
                type: DataTypes.INTEGER,
                defaultValue: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            species: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Character',
        }
    );
    return Character;
};
