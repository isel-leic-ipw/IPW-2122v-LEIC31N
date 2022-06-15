// File responsibilities
// Implement all games handling logic

import { errors } from '../errors.mjs'


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
        deleteGame : validateUser(deleteGame),
        validateCredentials : validateCredentials
    }


    function validateUser(f) {
        return async function(...args) {
            const token = args[0]
            // Validate if it is a valid string for a token
            if(!token || token.constructor !== String) {
                return Promise.reject(errors.INVALID_TOKEN())
                // TODO: Validate if the string corresponds to a UUID
            }
            const user = await usersData.getUserByToken(token)
            args[0] = user.userId
            // console.log(`user: `, user)
            // console.log(`token: `, token)
            // console.log(`args: `, args)
            return f.apply(null, args)
        }
    }

    async function getGames(userId, nameFilter){
        return gamesData.getGames(userId, nameFilter)
    }


    async function getGame(userId, id){
        if(!id) 
            return Promise.reject(errors.INVALID_ARGUMENT("id"))   
            //throw errors.INVALID_ID   
        return await validateUserOwnsGame(userId, id)
        
    }

    async function createGame(userId, name, description){
        if(!name) return Promise.reject(errors.INVALID_ARGUMENT("name"))
        
        const newGame = { name : name, description: description, ownerUser: userId  }
        return gamesData.createGame(newGame)
    }

    async function updateGame(userId, id, name, description){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        if(!name) throw errors.INVALID_ARGUMENT("name")

        await validateUserOwnsGame(userId, id)

        const newGame = {id, name, description, ownerUser: user.userId} 
        return gamesData.updateGame(newGame)
    }

    async function deleteGame(userId, id){ 
        if(!id) return Promise.reject(errors.INVALID_ARGUMENT("id"))
        await validateUserOwnsGame(userId, id)
        return gamesData.deleteGame(id)
    }

    async function validateUserOwnsGame(userId, gameId) {
        const game = await gamesData.getGame(gameId)
        
        if(!game || game.ownerUser != userId) {
             throw errors.INVALID_USER()
        }
        return game
    }

    async function validateCredentials(username, password) {
        try {
            const user = await usersData.getUserByUsername(username)
            if(user.password != password) {
                return null
            }
            return user.authToken
        } catch(e) {
            return null
        }
    }
}


