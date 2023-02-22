const db = require('../models')
const Character = db.Character

async function getData() {
    console.log('ejecutando api')

    try {

        const response = await fetch(`https://rickandmortyapi.com/api/character`)
        const data = await response.json()
        const results = data.results
        console.log(data)

        const dataResults = results.map(d => ({
            characterId: d.id, 
            name: d.name,
            status: d.status,
            species: d.species,
            image: d.image
        }));

        const itemstoCreation = []
        const existedResults = await Character.findAll()
        console.log(existedResults)

        for (const item of dataResults) {
            const match = existedResults.find((existedResult) => existedResult.characterId === item.characterId)
            if (!match) {
                itemstoCreation.push(item)
            }
        }

        if (itemstoCreation.length > 0) {
            Character.bulkCreate(itemstoCreation)
            return 'Sincronizando base de datos'
        }

        return 'No hay datos nuevos para guardar en la base de datos'
    }
    catch (error) {
        console.log(error.message)
    }
}

module.exports = getData