// Module responsibilities
// Register game api routes
// Have the functions that handle HTTP requests

import express from 'express'

const SITE_TRACKING_COOKIE = "site-tracking"
const USER_TOKEN_COOKIE = "user-token"

import handleError from './http-errors.mjs'

export default function(services) {
    const app = express.Router()

    app.get('/', home)                                    // Get all games
    app.get('/games/create', getCreateGameForm)           // Get a form to create a game
    app.get('/games', handlerWrapper(getGames))           // Get all game
    app.get('/games/:id', handlerWrapper(getGame))        // Get a game details

    //app.delete('/games/:id', handlerWrapper(deleteGame))  // Delete a game
    // The game deletion should be a delete method, but to overcome forms method limitation, we must use a POST
    app.post('/games/:id/delete', handlerWrapper(deleteGame))  // Delete a game

    app.post('/games/:id/update', handlerWrapper(updateGame))     // Update a game
    app.post('/games', handlerWrapper(createGame))        // Delete a game

    return app


    function setUserToken(req, rsp) {
        // Hammer time. Frankenstein here gets even uglier....
        //req.token = '0b115b6e-8fcd-4b66-ac26-33392dcb9340'

        const tokenCookie = req.cookies[USER_TOKEN_COOKIE]
        if(tokenCookie) {
            req.token = tokenCookie
        } else {
            req.token = '3dfd8596-cfd3-431d-8e36-f0fc4c64f364'
            rsp.cookie(USER_TOKEN_COOKIE, req.token)
        }
    }
    
    function handlerWrapper(handler) {
        return async function(req, rsp) {
            setUserToken(req,rsp)
            
            console.log(req.token)
            rsp.cookie(SITE_TRACKING_COOKIE, `${req.cookies[SITE_TRACKING_COOKIE]||""}-${req.path}`)
            // This code is equivalent to the following code with async/await
            // handler(req,rsp).catch(e => { const error = handleError(e) 
            //     rsp.status(error.status).json(error.body)})

            try {
                await handler(req, rsp)
            } catch(e) {
               const error = handleError(e) 
               rsp.status(error.status).json(error.body)
            }    
        }
    }

    async function home(req, resp) {
        resp.render('home', {home: true})
    }

    async function getCreateGameForm(req, resp) {
        resp.render('createGame', {createGame: true})
    }

    async function getGames(req, resp) {
        let games = await services.getGames(req.token, req.query.search)
        resp.render('games', {g: games, title: 'All Games', games: true})
    }

    async function getGame(req, resp) {
        const game = await services.getGame(req.token, req.params.id)
        return resp.render('game', {g: game, title: `Game ${game.name}`, game: true})
    }

    async function updateGame(req, resp) {  
        await services.updateGame(req.token, req.params.id, req.body.name, req.body.description)
    }

    async function createGame(req, resp) {
        await services.createGame(req.token, req.body.name, req.body.description)
        resp.redirect('/games')
    }

    async function deleteGame(req, resp) {
        await services.deleteGame(req.token, req.params.id)
        resp.redirect('/games')
    }
}