const { StatusCodes } = require("http-status-codes")

class ErrorNotFound extends Error {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

const createErrorNotFound = (msg) => {
    return new CustomAPIError(msg)
}

module.exports = { ErrorNotFound, createErrorNotFound }
