const jwt = require("jsonwebtoken")
const createErrorUnauthorized = require("../errors/unauthorized-error")

const authorizeToken = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        throw new createErrorUnauthorized("Not Authorized, No Token Sent")
    }

    try {
        const decoded = jwt.verify(authorizationHeader, process.env.JWT_SECRET)
        const name = decoded.name
        req.user = name
        next()
    } catch (error) {
        throw new createErrorUnauthorized("Not authorized to take this path!")
    }
}

module.exports = authorizeToken
