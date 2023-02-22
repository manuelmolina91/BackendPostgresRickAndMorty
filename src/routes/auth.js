const {signup, login} = require('../controllers/auth')
const router = require('express').Router()

router.post('/signup', async (request, response) => {
    try {
        const {name, email, password} = request.body
        if (!name || !email || !password) {
            response.status(502).json('Incorrect data')
        } 
        const token = await signup({name, email, password})
        response.status(200).json(token)
    } catch (error) {
        response.status(500).json(error.message)
    }
})

router.post('/login', async (request, response) => {
    try {
        const {email, password} = request.body
        if (!email || !password) {
            response.status(502).json('Incorrect data')
        }
        const token = await login({email, password})
        response.status(200).json(token)
    } catch (error) {
        response.status(500).json(error.message)
    }
})

module.exports = router