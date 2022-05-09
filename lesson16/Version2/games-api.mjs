// File responsibilities
// Register game api routes
// Have the functions that handle HTTP requests

import express from 'express'

// export default function (app) {
//     if(!app)
//         throw "Only work with Beer!!!"

const app = express.Router()
export default app

app.get('/api/games', getGames)           // Get all jokes
app.get('/api/games/:id', getGame)        // Get a joke details
app.delete('/api/games/:id', deleteGame)  // Delete a joke
app.put('/api/games/:id', updateGame)     // Update a joke
app.post('/api/games', createGame)        // Delete a joke

function getGames(req, resp) {
    resp.json({ message: "Get Games" })
}

function getGame(req, resp) {
    resp.json({ message: "getGameByID id = " + req.params.id })
}

function updateGame(req, resp) {
    console.log('Received in body: ', req.body)
    resp.json({ message: "updateGame id = " + req.params.id })

}

function createGame(req, resp) {
    console.log('Received in body: ', req.body)
    resp
        .status(201)
        .json({ message: "createGame" })
}

function deleteGame(req, resp) {
    resp.json({ message: "deleteGame id = " + req.params.id })
}


