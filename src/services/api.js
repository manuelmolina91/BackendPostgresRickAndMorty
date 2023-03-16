const db = require('../models');
const Character = db.Character;
const Episode = db.Episode;
const Location = db.Location;

async function apiCharactersList() {
    try {
        for (let i = 1; i < 42; i++) {
            const response = await fetch(
                `https://rickandmortyapi.com/api/character?page=${i}`
            );
            const data = await response.json();
            const results = data.results;
            const responseResults = results.map((result) => ({
                character_id: result.id,
                name: result.name,
                status: result.status,
                species: result.species,
                image: result.image,
            }));

            const characterToCreate = [];
            const existedResults = await Character.findAll();

            for (const item of responseResults) {
                const match = existedResults.find(
                    (existedResult) =>
                        existedResult.character_id === item.character_id
                );
                if (!match) {
                    characterToCreate.push(item);
                }
            }
            if (characterToCreate.length > 0) {
                Character.bulkCreate(characterToCreate);
            }
        }
        await apiEpisodesList();
    } catch (error) {
        console.log('Error al sincronizar los personajes ' + error.message);
    }
}

async function apiEpisodesList() {
    try {
        const page1Response = await fetch(
            'https://rickandmortyapi.com/api/episode?page=1'
        );
        const page1Data = await page1Response.json();
        const page1Results = page1Data.results;

        const page2Response = await fetch(
            'https://rickandmortyapi.com/api/episode?page=2'
        );
        const page2Data = await page2Response.json();
        const page2Results = page2Data.results;

        const page3Response = await fetch(
            'https://rickandmortyapi.com/api/episode?page=3'
        );
        const page3Data = await page3Response.json();
        const page3Results = page3Data.results;

        const allResults = [...page1Results, ...page2Results, ...page3Results];

        const responseResults = await Promise.all(
            allResults.map(async (result) => {
                const episodeCharactersId = await Promise.all(
                    result.characters.map(async (character) => {
                        try {
                            // const characterResponse = await fetch(character);
                            // const characterData =
                            //     await characterResponse.json();
                            const characterId = character.split('/')[5];
                            const characterIdDb = await Character.findOne({
                                where: { character_id: characterId },
                            });
                            console.log(characterIdDb.id);
                            return characterIdDb.id;
                        } catch (error) {
                            console.log(
                                'Error al llamar a personajes de episodio' +
                                    error
                            );
                        }
                    })
                );

                return {
                    episode_id: result.id,
                    name: result.name,
                    air_date: result.air_date,
                    episode: result.episode,
                    characters: episodeCharactersId,
                };
            })
        );

        const episodesToCreate = [];
        const existedResults = await Episode.findAll();

        for (const item of responseResults) {
            const match = existedResults.find(
                (existedResult) => existedResult.episode_id === item.episode_id
            );
            if (!match) {
                episodesToCreate.push(item);
            }
        }

        if (episodesToCreate.length > 0) {
            const createdEpisodes = await Episode.bulkCreate(episodesToCreate);

            for (const episode of createdEpisodes) {
                const characters = episode.characters;
                const charactersDb = await Character.findAll({
                    where: { id: characters },
                });
                const charactersDbIds = charactersDb.map(
                    (character) => character.id
                );
                console.log({ charactersDb });
                await episode.addCharactersOfEpisode(charactersDbIds);
            }
        }
        await apiLocationsList();
    } catch (error) {
        console.log('Error al sincronizar episodes ' + error.message);
    }
}

async function apiLocationsList() {
    try {
        for (let i = 1; i < 8; i++) {
            const response = await fetch(
                `https://rickandmortyapi.com/api/location?page=${i}`
            );
            const data = await response.json();
            const results = data.results;

            const responseResults = results.map((response) => ({
                location_id: response.id,
                name: response.name,
                type: response.type,
                dimension: response.dimension,
            }));

            const locationsToCreate = [];
            const existedResults = await Location.findAll();

            for (const item of responseResults) {
                const match = existedResults.find(
                    (existedResult) =>
                        existedResult.location_id === item.location_id
                );
                if (!match) {
                    locationsToCreate.push(item);
                }
            }

            if (locationsToCreate.length > 0) {
                Location.bulkCreate(locationsToCreate);
            }
        }
    } catch (error) {
        console.log('Error al sincronizar las locations ' + error.message);
    }
}

module.exports = {
    apiCharactersList,
    apiEpisodesList,
    apiLocationsList,
};
