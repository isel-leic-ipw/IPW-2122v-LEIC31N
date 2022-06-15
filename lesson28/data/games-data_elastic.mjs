//curl -X PUT http://localhost:9200/games
//curl -X POST --data '{ "id" : 1 , "text" : "game 1 elastic" }' -H "Content-Type: application/json" http://localhost:9200/games/_doc
//curl -X POST --data '{ "id" : 2 , "text" : "game 2 elastic" }' -H "Content-Type: application/json" http://localhost:9200/games/_doc

import {get, post} from './fetch-wrapper.mjs'
import uriManager from './uri-manager.mjs'

export default function () {
    const INDEX_NAME = 'games'
    const URI_MANAGER = uriManager(INDEX_NAME)

    return {
        getGames: getGames,
        getGame: getGame,
        updateGame: updateGame,
        createGame: createGame,
        deleteGame: deleteGame
    }

    async function getGames(userId) {
        const query = {
            query: {
              match: {
                "ownerUser": userId
              }
            }
          }
        return post(URI_MANAGER.getAll(), query)
            .then(body => body.hits.hits.map(createGameFromElastic))

    }

    async function getGame(id) {
        return get(URI_MANAGER.get(id))
            .then(createGameFromElastic)
    }

    async function createGame(game) {
        const newGame = Object.assign(game)
        return post(URI_MANAGER.create(), newGame)
            .then(body => { newGame.id = body._id; return newGame })
    }

    async function updateGame(userId, id, name, description) {
        console.log("updateGame")
    }

    async function deleteGame(id) {
        return del(URI_MANAGER.delete(id), )
            .then(body => body._id)
    }


    function createGameFromElastic(gameElastic) {
        let game = gameElastic._source
        game.id = gameElastic._id
        return game
    }
}