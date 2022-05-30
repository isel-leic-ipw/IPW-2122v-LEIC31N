// Module responsibilities
// Register game api routes
// Have the functions that handle HTTP requests

import express from 'express'


import handleError from './http-errors.mjs'

export default function(services) {
    const app = express.Router()

    app.get('/games', handlerWrapper(getGames))           // Get all jokes
    app.get('/games/:id', handlerWrapper(getGame))        // Get a joke details
    app.delete('/games/:id', handlerWrapper(deleteGame))  // Delete a joke
    app.put('/games/:id', handlerWrapper(updateGame))     // Update a joke
    app.post('/games', handlerWrapper(createGame))        // Delete a joke

    return app


    function setUserToken(req) {
        // Hammer time. Frankenstein here gets even uglier....
        req.token = '0b115b6e-8fcd-4b66-ac26-33392dcb9340'
    }
    


    function handlerWrapper(handler) {
        return async function(req, rsp) {
            setUserToken(req)
            console.log(req.token)
            try {
                handler(req, rsp)
            } catch(e) {
               const error = handleError(e) 
               rsp.status(error.status).json(error.body)
            }    
        }
    }

    async function getGames(req, resp) {
        const games = await services.getGames(req.token)
        resp.render('games', {g: games})
    }

    async function getGame(req, resp) {
        const game = await services.getGame(req.token, req.params.id)
        resp.render('game', game)
    }

    async function updateGame(req, resp) {  
        await services.updateGame(req.token, req.params.id, req.body.name, req.body.description)
    }

    async function createGame(req, resp) {
        resp.status(201)
        return await services.createGame(req.token, req.body.name, req.body.description)
    }

    async function deleteGame(req, resp) {
        await services.deleteGame(req.token, req.params.id)
    }
}