// File responsibilities
// 1 - Include the API modules that configure the server
// 2 - Launch the server and wait for requests

import express from 'express'
const app = express()
const PORT = 1904

app.use(express.json())

// Passing application instance to games-api
// import gamesApi from './games-api.mjs'
// gamesApi(app)


// games-api returns router
import gamesApi from './games-api.mjs'
app.use(gamesApi)

// Configure CRUD routes to manage jokes 

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))

