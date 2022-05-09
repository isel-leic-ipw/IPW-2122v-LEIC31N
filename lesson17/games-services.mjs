// File responsibilities
// Implement all games handling logic


const games = [
    {id : 1, name : "game1", description: "game1 description"},
    {id : 2, text : "game2", description: "game2 description"},
]

let nextId = 3

export default {
    getGames : getGames,
    getGame : getGame,
    updateGame : updateGame,
    createGame : createGame,
    deleteGame : deleteGame
}

async function getGames(){
    return Promise.resolve(games)
}


async function getGame(id){
    if(!id) return Promise.reject("Invalid ID")
    const game = games.find(t => t.id == id)
    if(!game) return Promise.reject("Not Found")
    return Promise.resolve(game)
}

async function createGame(name, description){
    if(!name) return Promise.reject("Invalid name for a game")
    const newId = nextId++
    const newGame = {id : newId, name : name, description: description}
    games.push(newGame)
    return Promise.resolve(newGame)
    
}

async function updateGame(id, name, description){
    //return Promise.resolve("updateGame")
    return "updateGame"
}

async function deleteGame(id){ 
    return Promise.resolve("deleteGame")
}
