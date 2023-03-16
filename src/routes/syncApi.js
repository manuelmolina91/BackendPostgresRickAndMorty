const syncApi = require('express').Router();
const { apiCharactersList } = require('../services/api');

syncApi.get('/', async (request, response) => {
    try {
        await apiCharactersList();
        response.status(200).json('DATOS METIDOS EN LA DB');
    } catch (error) {
        response.status(500);
    }
});

module.exports = syncApi;
