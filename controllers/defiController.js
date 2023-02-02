const Protocol = require("../models/defiModel")
const asyncWrapper = require("express-async-handler")
const { createCustomError } = require("../middleware/errorHandler")

// GET
const viewOneProtocol = asyncWrapper(async (req, res, next) => {
    const id = req.params.id
    const protocol = await Protocol.findById(id)
    if (!protocol) {
        return next(createCustomError(`No task with id : ${id}`, 404))
    }
    res.status(200).json({ protocol })
})

// GET
const viewAllProtocols = asyncWrapper(async (req, res) => {
    const protocols = await Protocol.find({})
    res.status(200).json({ protocols })
})

// POST
const addProtocol = asyncWrapper(async (req, res) => {
    const protocol = await Protocol.create(req.body)
    res.status(201).json({ protocol })
})

// DELETE
const deleteProtocol = asyncWrapper(async (req, res, next) => {
    const id = req.params.id
    const protocol = await Protocol.findByIdAndDelete(id)
    if (!protocol) {
        return next(createCustomError(`No task with id : ${id}`, 404))
    }
    res.status(201).json({ message: "success", deleted: protocol })
})

// PATCH
const updateSingleInfo = asyncWrapper(async (req, res) => {
    const id = req.params.id
    const protocol = await Protocol.findByIdAndUpdate(id, req.body).setOptions({
        returnDocument: "after",
        runValidators: true,
    })
    if (!protocol) {
        return next(createCustomError(`No task with id : ${id}`, 404))
    }
    res.status(201).json({ message: "success", updated: protocol })
})

// PUT
const updateEntireProtocol = asyncWrapper(async (req, res) => {
    const id = req.params.id
    const protocol = await Protocol.replaceOne({ _id: id }, req.body).setOptions({
        returnDocument: "after",
        runValidators: true,
    })
    if (!protocol) {
        return next(createCustomError(`No task with id : ${id}`, 404))
    }
    res.status(201).json({ message: "success", updated: protocol })
})

module.exports = {
    viewAllProtocols,
    viewOneProtocol,
    addProtocol,
    deleteProtocol,
    updateEntireProtocol,
    updateSingleInfo,
}
