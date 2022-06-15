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
        let token = req.get("Authorization")
        if(token) {
            token = token.split(' ')[1]
            let buff = Buffer.from(token, 'base64');
            req.token = buff.toString('ascii').split(':')[0]
            console.log(req.token)
        }
    }
    


    function handlerWrapper(handler) {
        return async function(req, rsp) {
            setUserToken(req)
            console.log(req.token)
            try {
                rsp.json(await handler(req, rsp))
            } catch(e) {
               const error = handleError(e) 
               rsp.status(error.status).json(error.body)
            }    
        }
    }

    async function getGames(req, resp) {
        return await services.getGames(req.token)
    }

    async function getGame(req, resp) {
        await services.getGame(req.token, req.params.id)
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