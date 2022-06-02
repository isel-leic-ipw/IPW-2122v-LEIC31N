
// File responsibilities
// Implement data access to memory storage

import { errors } from './errors.mjs'


const USERS = [
    { userId: 100, userName: 'User1', authToken: '0b115b6e-8fcd-4b66-ac26-33392dcb9340'}, 
    { userId: 101, userName: 'user2', authToken: '3dfd8596-cfd3-431d-8e36-f0fc4c64f364'}
]


let nextId = 102

export default function () {
    return {
        getUserByToken
    }

    async function getUserByToken(token) {
        const user = USERS.find(u => u.authToken == token)
        if(!user) {
            throw errors.NOT_FOUND('User')
        }
        return user
    }

}