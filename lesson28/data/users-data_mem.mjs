
// File responsibilities
// Implement data access to memory storage

import { errors } from '../errors.mjs'


const USERS = [
    { userId: 100, userName: 'User1', password: "1234", authToken: '0b115b6e-8fcd-4b66-ac26-33392dcb9340'}, 
    { userId: 101, userName: 'User2', password: "1234", authToken: '3dfd8596-cfd3-431d-8e36-f0fc4c64f364'}
]


let nextId = 102

export default function () {
    return {
        getUserByToken,
        getUserByUsername
    }

    async function getUserByToken(token) {
        return getUserBy("authToken", token)
    }

    async function getUserByUsername(username) {
        return getUserBy("userName", username)
    }

    async function getUserBy(propName, value) {
        const user = USERS.find(u => u[propName] == value)
        if(!user) {
            throw errors.NOT_FOUND('User')
        }
        return user
    }




}