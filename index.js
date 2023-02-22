const express = require('express')
const bodyParser = require('body-parser')
const syncApi = require('./src/routes/syncApi')
const db = require('./src/models')
const dotenv = require('dotenv')
const cors = require('cors')




dotenv.config()

const startApp = async () => {
    const app = express()
    app.use(cors());
    const port = process.env.port

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use('/syncApi', syncApi)

try {
    await db.sequelize.sync({force:false})
    app.listen(port, () => {
        console.log('APP running on port ' + port)
    })
} catch (error) {
    console.log(error)
    process.exit(error.message)
}

}

startApp()