// File responsibilities
// Implement all games handling logic

import { errors } from './errors.mjs'


export default function(gamesData, usersData)  {
    if(!gamesData)
        throw "Invalid games data object"    
    if(!usersData)
        throw "Invalid users data object"    
    return {
        getGames : validateUser(getGames),
        getGame : validateUser(getGame),
        updateGame : validateUser(updateGame),
        createGame : validateUser(createGame),
        deleteGame : validateUser(deleteGame)
    }


    function validateUser(f) {
        return async function(...args) {
            const token = args[0]
            // Validate if it is a valid string for a token
            if(!token || token.constructor !== String) {
                return Promise.reject(errors.INVALID_TOKEN())
                // TODO: Validate if the string corresponds to a UUID
            }

            return f.apply(null, args)
        }
    }

    async function getGames(userToken){
        return gamesData.getGames(userToken)
    }


    async function getGame(userToken, id){
        if(isNaN(Number(id))) 
            return Promise.reject(errors.INVALID_ARGUMENT("id"))   
            //throw errors.INVALID_ID   
        return gamesData.getGame(userToken, id)
    }

    async function createGame(userToken, name, description){
        if(!name) return Promise.reject(errors.INVALID_ARGUMENT("name"))
        
        const user = await usersData.getUserByToken(userToken)
        const newGame = { name : name, description: description, ownerUser: user.id  }
        return gamesData.createGame(newGame)
    }

    async function updateGame(userToken, id, name, description){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        if(!name) throw errors.INVALID_ARGUMENT("name")

        const game = await gamesData.getGame(id)
        const user = await usersData.getUserByToken(userToken)
        if(game.ownerUser != user.userId) {
            throw errors.INVALID_USER()
        }

        const newGame = {id, name, description, ownerUser: user.userId} 
        return gamesData.updateGame(newGame)
    }

    async function deleteGame(userToken, id){ 
        if(!id) return Promise.reject(errors.INVALID_ARGUMENT("id"))
        return gamesData.deleteGame(id)
    }
}


