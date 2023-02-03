const express = require("express")
const { StatusCodes } = require("http-status-codes")
require("dotenv").config()
const port = process.env.PORT
const mongoose = require("mongoose")
const errorHandlerMiddleware = require("./middleware/error-handler")
const defiRoutes = require("./routes/defi-routes")

const app = express()

mongoose.set("strictQuery", false)
try {
    mongoose.connect(process.env.MONGOURI, () => {
        console.log("Connected to MongoDB...")
        app.listen(port, () => {
            console.log("Connected to App!")
        })
    })
} catch (e) {
    console.log(e)
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/defi/v1", defiRoutes)

app.use("/", () => {
    res.status(StatusCodes.NOT_FOUND).send("Route not found!")
})

app.use(errorHandlerMiddleware)
