'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Episode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Episode.belongsToMany(models.User, {
                through: 'userFavoritesEpisode',
                as: 'favoritesEpisodes',
                foreignKey: 'episode_FK',
                onDelete: 'cascade',
            });
            Episode.belongsToMany(models.Character, {
                through: 'episodeCharacters',
                as: 'charactersOfEpisode',
                foreignKey: 'episode_FK',
                onDelete: 'cascade',
            });
        }
    }
    Episode.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            episode_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            air_date: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            episode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            characters: {
                type: DataTypes.ARRAY(DataTypes.STRING),
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
            modelName: 'Episode',
        }
    );
    return Episode;
};
