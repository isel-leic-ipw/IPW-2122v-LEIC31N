// Module responsibilities
// Contain all application errors


export const errorCodes = {
    INVALID_ARGUMENT: 1000,
    NOT_FOUND: 1001,
    INVALID_TOKEN: 1002,
    INVALID_USER: 1003
}

export const errors = {
    INVALID_ARGUMENT: (argumentName) => {
        return {
            code: errorCodes.INVALID_ARGUMENT,
            message: `Invalid ${argumentName}`
        }
    },
    NOT_FOUND: (what = '') => {
        what = what ? what + ' ' : what
        return {
            code: errorCodes.NOT_FOUND,
            message: `${what}Not found`
        }
    },
    INVALID_TOKEN: () => {
        return {
            code: errorCodes.INVALID_TOKEN,
            message: `Invalid Token`
        }
    },

    INVALID_USER: () => {
        return {
            code: errorCodes.INVALID_USER,
            message: `Invalid User`
        }
    }
}

