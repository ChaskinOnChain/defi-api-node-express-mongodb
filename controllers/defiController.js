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
const viewFilteredProtocols = asyncWrapper(async (req, res) => {
    const { name, type, sort, fields, numericFilters } = req.query
    const queryObject = {}
    if (name) {
        queryObject.name = { $regex: name, $options: "i" }
    }
    if (type) {
        queryObject.type = type
    }
    if (numericFilters) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ["TVL"]
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-")
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }

    let protocols = Protocol.find(queryObject)
    if (sort) {
        const sortedSearch = sort.split(",").join(" ")
        protocols = protocols.sort(sortedSearch)
    } else {
        const sortedSearch = "-TVL"
        protocols = protocols.sort(sortedSearch)
    }
    if (fields) {
        const sortedSearch = fields.split(",").join(" ")
        protocols = protocols.select(sortedSearch)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = await protocols.skip(skip).limit(limit)
    res.status(200).json({ result, nbHits: result.length })
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
    viewOneProtocol,
    viewFilteredProtocols,
    addProtocol,
    deleteProtocol,
    updateEntireProtocol,
    updateSingleInfo,
}
