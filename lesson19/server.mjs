// File responsibilities
// 1 - Include the API modules that configure the server, and provide them its dependencies
// 2 - Launch the server and wait for requests
import express from 'express'
import cors from 'cors'


// Import gamesApi and all its direct and indirect dependencies
//import dataInit from './games-data_elastic.mjs'
import gamesDataInit from './games-data_mem.mjs'
const gamesData = gamesDataInit()

import usersDataInit from './users-data_mem.mjs'
const usersData = usersDataInit()


import servicesInit from './games-services.mjs'
const services = servicesInit(gamesData, usersData)

// games-api returns router
import gamesApiInit from './games-api.mjs'
const gamesApi = gamesApiInit(services)


// Create and initialize the Express application
const app = express()
const PORT = 1904

app.use(cors())
app.use(express.json())
app.use(gamesApi)

// Listen for API request
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))

