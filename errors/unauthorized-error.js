const { StatusCodes } = require("http-status-codes")

class ErrorUnauthorized extends Error {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

const createErrorUnauthorized = (msg) => {
    return new CustomAPIError(msg)
}

module.exports = { ErrorUnauthorized, createErrorUnauthorized }
