// Module responsibilities
// Register game api routes
// Have the functions that handle HTTP requests

import express from 'express'


import handleError from './http-errors.mjs'

export default function(services) {
    const app = express.Router()

    app.get('/api/games', handlerWrapper(getGames))           // Get all jokes
    app.get('/api/games/:id', handlerWrapper(getGame))        // Get a joke details
    app.delete('/api/games/:id', handlerWrapper(deleteGame))  // Delete a joke
    app.put('/api/games/:id', handlerWrapper(updateGame))     // Update a joke
    app.post('/api/games', handlerWrapper(createGame))        // Delete a joke

    return app


    function handlerWrapper(handler) {
        return async function(req, rsp) {
            try {
                rsp.json(await handler(req, rsp))
            } catch(e) {
               const error = handleError(e) 
               rsp.status(error.status).json(error.body)
            }    
        }
    }

    async function getGames(req, resp) {
        return await services.getGames()
    }

    async function getGame(req, resp) {
        await services.getGame(req.params.id)
    }

    async function updateGame(req, resp) {  
        await services.updateGame(req.params.id, req.body.name, req.body.description)
    }

    async function createGame(req, resp) {
        resp.status(201)
        return await services.createGame(req.body.name, req.body.description)
    }

    async function deleteGame(req, resp) {
        await services.deleteGame(req.params.id)
    }
}