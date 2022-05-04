// V1 - This file has EVERITHING (all responsabilities)!!!

import express from 'express'
const app = express()
const PORT = 1904
app.use(express.json())

// Configure CRUD routes to manage games 
app.get('/api/games', getGames)           // Get all games
app.get('/api/games/:id', getGame)        // Get a game details
app.delete('/api/games/:id', deleteGame)  // Delete a game
app.put('/api/games/:id', updateGame)     // Update a game
app.post('/api/games', createGame)        // Delete a game

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))


function getGames(req, resp){
    resp.json({message : "Get Games" })
}

function getGame(req, resp){
    resp.json({message : "getGameByID id = " + req.params.id })
}

function updateGame(req, resp){
    console.log('Received in body: ', req.body)
    resp.json({message : "updateGame id = " + req.params.id })
    
}

function createGame(req, resp){
    console.log('Received in body: ', req.body)
    resp
        .status(201)
        .json({message : "createGame" })
}

function deleteGame(req, resp){ 
    resp.json({message : "deleteGame id = " + req.params.id })
}





