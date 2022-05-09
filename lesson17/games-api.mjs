// File responsibilities
// Register game api routes
// Have the functions that handle HTTP requests

import express from 'express'
import services from './games-services.mjs'

const app = express.Router()
export default app

app.get('/api/games', getGames)           // Get all jokes
app.get('/api/games/:id', getGame)        // Get a joke details
app.delete('/api/games/:id', deleteGame)  // Delete a joke
app.put('/api/games/:id', updateGame)     // Update a joke
app.post('/api/games', createGame)        // Delete a joke

async function getGames(req, resp) {
    //rsp.json(await services.getGames())
    
    services.getGames()
        .then(games => resp.json(games))
}

async function getGame(req, resp) {
    resp.json(await services.getGame(req.params.id))
}

async function updateGame(req, resp) {
    resp.json(await services.updateGame(req.params.id, req.body.name, req.body.description))

}

async function createGame(req, resp) {
    resp
        .status(201)
        .json(await services.createGame(req.body.name, req.body.description))
}

async function deleteGame(req, resp) {
    resp.json(await services.deleteGame(req.params.id))
}


