
// File responsibilities
// Implement data access to memory storage

import { errors } from './errors.mjs'

const games = [
    { id: 1, name: "game1", description: "game1 description1" },
    { id: 2, text: "game2", description: "game2 description" },
]


let nextId = 3

export default function () {
    return {
        getGames: getGames,
        getGame: getGame,
        updateGame: updateGame,
        createGame: createGame,
        deleteGame: deleteGame
    }

    async function getGames() {
        return Promise.resolve(games)
    }

    async function getGame(id) {
        const game = games.find(g => g.id == id)
        if (!game) throw errors.NOT_FOUND()
        return Promise.resolve(game)
    }

    async function createGame(text) {
        const newId = nextId++
        const newGame = { id: newId, text: text }
        games.push(newGame)
        return Promise.resolve(newGame)

    }

    async function updateGame(newGame) {
        const idx = games.findIndex(g => g.id == newGame.id)
        if (idx == -1) {
            throw `Game with id ${newGame.id} not found`
        }
        games[idx] = newGame
        return newGame
    }

    async function deleteGame(id) {
        const idx = games.findIndex(g => g.id == id)
        if (idx == -1) {
            throw `Game with id ${id} not found`
        }
        const deletedGame = games[idx]
        games.splice(idx, 1)
        return deletedGame
    }
}