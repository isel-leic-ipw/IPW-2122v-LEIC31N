// Module responsibilities
// Contain all application errors


export const errorCodes = {
    INVALID_ARGUMENT: 1000,
    NOT_FOUND: 1001
}

export const errors = {
    INVALID_ARGUMENT: (argumentName) => {
        return {
            code: errorCodes.INVALID_ARGUMENT,
            message: `Invalid ${argumentName}`
        }
    },
    NOT_FOUND: () => {
        return {
            code: errorCodes.NOT_FOUND,
            message: `Not found`
        }
    }
}

