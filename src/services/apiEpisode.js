const db = require('../models')
const Episode = db.Episode


async function getEpisodes(page) {

    console.log('ejecutando api')

    try {
        console.log(`https://rickandmortyapi.com/api/episode?page=${page}`)
        const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
        const data = await response.json()
        const results = data.results
        
       
        const dataResults = results.map(d => ({
            episodeId: d.id, 
            name: d.name,
            air_date: d.air_date,
            episode: d.episode
        }));
        
        const itemstoCreation = []
        const existedResults = await Episode.findAll()

        for (const item of dataResults) {
            const match = existedResults.find((existedResult) => existedResult.episodeId === item.episodeId)
            if (!match) {
                itemstoCreation.push(item)
            }
        }
        // console.log(itemstoCreation)
        
        if (itemstoCreation.length > 0) {
            Episode.bulkCreate(itemstoCreation)
            return 'Sincronizando base de datos'
        }

        return 'No hay datos nuevos para guardar en la base de datos'
    }
    catch (error) {
        console.log(error.message)

    }
}

module.exports = getEpisodes