
// File responsibilities
// Implement data access to memory storage

import { errors } from '../errors.mjs'

const GAMES = [
    { id: 1, name: "game1", description: "game1 description", ownerUser: 100 },
    { id: 2, name: "game2", description: "game2 description" , ownerUser: 101 },
    { id: 3, name: "game3", description: "game3 description", ownerUser: 101 },
    { id: 4, name: "game4", description: "game4 description" , ownerUser: 101 },
]

let nextId = GAMES.length+1

export default function () {
    return {
        getGames: getGames,
        getGame: getGame,
        updateGame: updateGame,
        createGame: createGame,
        deleteGame: deleteGame
    }

    async function getGames(userId) {
        return Promise.resolve(GAMES)
    }

    async function getGame(userId, id) {
        const game = GAMES.find(g => g.id == id)
        if (!game) throw errors.NOT_FOUND()
        return Promise.resolve(game)
    }

    async function createGame(game) {
        const newGame = Object.assign(game)
        newGame.id = nextId++
        GAMES.push(newGame)
        return Promise.resolve(newGame)

    }

    async function updateGame(newGame) {
        const idx = GAMES.findIndex(g => g.id == newGame.id)
        if (idx == -1) {
            throw `Game with id ${newGame.id} not found`
        }
        GAMES[idx] = newGame
        return newGame
    }

    async function deleteGame(id) {
        const idx = GAMES.findIndex(g => g.id == id)
        if (idx == -1) {
            throw `Game with id ${id} not found`
        }
        const deletedGame = GAMES[idx]
        GAMES.splice(idx, 1)
        return deletedGame.id
    }
}