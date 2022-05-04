// File rsponsibilities
// Have the functions that handle HTTP requests

export default {
    getGames: getGames,
    getGame: getGame,
    createGame: createGame,
    deleteGame: deleteGame,
    updateGame: updateGame,
}


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






