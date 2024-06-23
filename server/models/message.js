const { Schema, model } = require("mongoose")

const massageSchema = new Schema(
    {
        roomChatId: { type: String, required: true, unique: true },
        senderId: Schema.Types.ObjectId,
        message: String,
        timestamp: Date
    }
)

module.exports = model("Messages", massageSchema, "Messages");