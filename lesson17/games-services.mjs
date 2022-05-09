// File responsibilities
// Implement all games handling logic



import gamesData from './games-data_mem.mjs'

export default {
    getGames : getGames,
    getGame : getGame,
    updateGame : updateGame,
    createGame : createGame,
    deleteGame : deleteGame
}

async function getGames(){
    return gamesData.getGames()
}


async function getGame(id){
    if(!id) return Promise.reject("Invalid ID")
    return gamesData.getGame(id)
}

async function createGame(name, description){
    if(!name) return Promise.reject("Invalid name for a game")
    const newGame = { name : name, description: description }
    return gamesData.createGame(newGame)
}

async function updateGame(id, name, description){
    if(!id) return Promise.reject("Invalid id")
    if(!name) return Promise.reject("Invalid name for a game")
    const game = await gamesData.getGame(id)
    const newName = name || game.name
    const newDescription = description || game.description

    //const newGame = {id: id, name: name, description: description} 
    // The following line defines the same as previous line, with less code
    const newGame = {id, name: newName, description: newDescription} 
    return gamesData.updateGame(newGame)
}

async function deleteGame(id){ 
    if(!id) return Promise.reject("Invalid id")
    return gamesData.deleteGame(id)
}
