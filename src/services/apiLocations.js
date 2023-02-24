const db = require('../models')
const Location = db.Location


async function getLocations(page) {

    console.log('ejecutando api')

    try {
        console.log(`https://rickandmortyapi.com/api/location?page=${page}`)
        const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`)
        const data = await response.json()
        const results = data.results
        
       
        const dataResults = results.map(d => ({
            locationId: d.id, 
            name: d.name,
            type: d.type,
            dimension: d.dimension
        }));
        
        const itemstoCreation = []
        const existedResults = await Location.findAll()

        for (const item of dataResults) {
            const match = existedResults.find((existedResult) => existedResult.locationId === item.locationId)
            if (!match) {
                itemstoCreation.push(item)
            }
        }
        // console.log(itemstoCreation)
        
        if (itemstoCreation.length > 0) {
            Location.bulkCreate(itemstoCreation)
            return 'Sincronizando base de datos'
        }

        return 'No hay datos nuevos para guardar en la base de datos'
    }
    catch (error) {
        console.log(error.message)

    }
}

module.exports = getLocations