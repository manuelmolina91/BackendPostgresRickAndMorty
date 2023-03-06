const syncApi = require('express').Router()
const getData = require('../services/api')
const getEpisodes = require('../services/apiEpisode')
const getLocations = require('../services/apiLocations')

syncApi.get('/characters', async (request, response) => {
    try {
        const api = await getData(request.query.page)
        response.status(200).json(api)
    } catch (error) {
        response.status(500)
    }    
}
)

syncApi.get('/locations', async (request, response) => {
    try {
        const api = await getLocations(request.query.page)
        response.status(200).json(api)
    } catch (error) {
        response.status(500)
    }    
}
)

syncApi.get('/episodes', async (request, response) => {
    try {
        const api = await getEpisodes(request.query.page)
        response.status(200).json(api)
    } catch (error) {
        response.status(500)
    }    
}
)

module.exports = syncApi
