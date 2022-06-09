
// File responsibilities
// Implement data access to memory storage

import { errors } from '../errors.mjs'

const GROUPS = [
    { id: 2000, name: "G1", description: "G1 description", ownerUser: 100, games:  [
        {
            id: 1, name: "game1", description: "game1 descr" 
        },
        {
            id: 1, name: "game2", description: "game2 descr"
        },
        {
            id: 1, name: "game3", description: "game3 descr"
        },
        {
            id: 1, name: "game4", description: "game4 descr"
        },
    ] },
    { id: 2001, name: "G1", description: "G1 description", ownerUser: 100, games:  [
        {
            id: 1, name: "game1"
        },
        {
            id: 1, name: "game1"
        },
        {
            id: 1, name: "game1"
        },
        {
            id: 1, name: "game1"
        },
        ] 
    }
]

let nextId = GAMES.length+1

export default function () {
    return {
        getGroup: getGroup,
        getGame: getGame,
        updateGame: updateGame,
        createGame: createGame,
        deleteGame: deleteGame
    }

    async function getGroup(userId, groupId) {
        const group = GAMES.find(g => g.id == groupId && g.ownerUser == userId)
        if (!group) throw errors.NOT_FOUND() 

        const retObj = {name: group.name, description: game.description, 
            games: group.games.map(g => {id: g.id, name: g.name} )}
        return Promise.resolve(group)
        
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