// File responsibilities
// Implement all games handling logic

import { errors } from './errors.mjs'


export default function(gamesData)  {
    if(!gamesData)
        throw "Invalid games data object"    
    return {
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
        if(isNaN(Number(id))) 
            return Promise.reject(errors.INVALID_ARGUMENT("id"))   
            //throw errors.INVALID_ID   
        return gamesData.getGame(id)
    }

    async function createGame(name, description){
        if(!name) return Promise.reject(errors.INVALID_ARGUMENT("name"))
        const newGame = { name : name, description: description }
        return gamesData.createGame(newGame)
    }

    async function updateGame(id, name, description){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        if(!name) throw errors.INVALID_ARGUMENT("name")
        const game = await gamesData.getGame(id)
        const newName = name || game.name
        const newDescription = description || game.description

        //const newGame = {id: id, name: name, description: description} 
        // The following line defines the same as previous line, with less code
        const newGame = {id, name: newName, description: newDescription} 
        return gamesData.updateGame(newGame)
    }

    async function deleteGame(id){ 
        if(!id) return Promise.reject(errors.INVALID_ARGUMENT("id"))
        return gamesData.deleteGame(id)
    }
}