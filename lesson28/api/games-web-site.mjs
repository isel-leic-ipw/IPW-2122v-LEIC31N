// Module responsibilities
// Register game api routes
// Have the functions that handle HTTP requests

import express from 'express'

const USER_TOKEN_COOKIE = "user-token"

import handlerWrapper from './web-site-common.mjs'

export default function(services) {
    const app = express.Router()

    app.get('/', home)                                    // Get all games
    app.get('/games/create',getCreateGameForm)           // Get a form to create a game
    app.get('/games', handlerWrapper(getGames))           // Get all game
    app.get('/games/:id', handlerWrapper(getGame))        // Get a game details

    //app.delete('/games/:id', handlerWrapper(deleteGame))  // Delete a game
    // The game deletion should be a delete method, but to overcome forms method limitation, we must use a POST
    app.post('/games/:id/delete', handlerWrapper(deleteGame))  // Delete a game

    app.post('/games/:id/update', handlerWrapper(updateGame))     // Update a game
    app.post('/games', handlerWrapper(createGame))        // Delete a game

    return app



    async function home(req, resp) {
        resp.render('home', {home: true})
    }

    async function getCreateGameForm(req, resp) {
        resp.render('createGame', {createGame: true})
    }

    async function getGames(req, resp) {
        let games = await services.getGames(req.user, req.query.search)
        resp.render('games', {g: games, title: 'All Games', games: true})
    }

    async function getGame(req, resp) {
        const game = await services.getGame(req.user, req.params.id)
        return resp.render('game', {g: game, title: `Game ${game.name}`, game: true})
    }

    async function updateGame(req, resp) {  
        await services.updateGame(req.user, req.params.id, req.body.name, req.body.description)
    }

    async function createGame(req, resp) {
        await services.createGame(req.user, req.body.name, req.body.description)
        resp.redirect('/games')
    }

    async function deleteGame(req, resp) {
        await services.deleteGame(req.user, req.params.id)
        resp.redirect('/games')
    }
}