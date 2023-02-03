const { StatusCodes } = require("http-status-codes")
const { CustomAPIError } = require("../errors/custom-error")

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ err: err.message })
    }
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Something went wrong, please try again" })
}

module.exports = errorHandlerMiddleware
