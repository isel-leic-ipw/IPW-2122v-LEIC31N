// File responsibilities
// 1 - Configure the server
// 2 - Launch the server and wait for requests

import express from 'express'
const app = express()
const PORT = 1904
import gamesApi from './games-api.mjs'
app.use(express.json())



// Configure CRUD routes to manage jokes 
app.get('/api/jokes', gamesApi.getGames)           // Get all jokes
app.get('/api/jokes/:id', gamesApi.getGame)        // Get a joke details
app.delete('/api/jokes/:id', gamesApi.deleteGame)  // Delete a joke
app.put('/api/jokes/:id', gamesApi.updateGame)     // Update a joke
app.post('/api/jokes', gamesApi.createGame)        // Delete a joke

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))

