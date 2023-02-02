const Protocol = require("../models/defiModel")
const asyncWrapper = require("express-async-handler")

const viewProtocols = asyncWrapper(async (req, res) => {
    const protocols = await Protocol.find({})
    res.status(200).json({ protocols })
})

const addProtocol = asyncWrapper(async (req, res) => {
    const protocol = await Protocol.create(req.body)
    res.status(201).json({ protocol })
})

const deleteProtocol = asyncWrapper(async (req, res) => {
    const id = req.params
    const protocol = await Protocol.findOneAndDelete({ _id: id })
    if (!protocol) {
        return res.status(404).json({ message: "You done goofed" })
    }
})

const updateEntireProtocol = asyncWrapper(async (req, res) => {
    return res.json({
        message: "put success",
    })
})

const updateSingleInfo = asyncWrapper(async (req, res) => {
    return res.json({
        message: "patch success",
    })
})

module.exports = {
    viewProtocols,
    addProtocol,
    deleteProtocol,
    updateEntireProtocol,
    updateSingleInfo,
}
