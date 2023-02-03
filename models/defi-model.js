const mongoose = require("mongoose")

const protocolSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "You need to include a name"],
            trim: true,
        },
        type: {
            type: String,
            required: [true, "You need to include a type"],
            trim: true,
        },
        TVL: {
            type: Number,
        },
        Chains: {
            type: [String],
            required: [true, "You need to include at least one chain"],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Protocol", protocolSchema)
