const { Schema, model } = require("mongoose")

const massageSchema = new Schema(
    {
        roomChatId: { type: String, required: true },
        senderId: Schema.Types.ObjectId,
        massage: String,
        timestamp: Date
    }
)

module.exports = model("Massages", massageSchema, "Massages");