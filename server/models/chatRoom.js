const { Schema, model } = require("mongoose")

const chatSchema = new Schema(
    {
        roomId: { type: String, required: true, unique: true, index: true },
        participant: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        timestamp: Date
    }
)

module.exports = model("chatRoom", chatSchema, "chatRoom");