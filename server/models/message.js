const { Schema, model } = require("mongoose")

const massageSchema = new Schema(
    {
        roomChatId: { type: Schema.Types.ObjectId, required: true, index: true, ref: "chatRoom" },
        senderId: { type: Schema.Types.ObjectId, ref: 'Users' },
        massage: String,
        seen: { type: Boolean, default: false },
        timestamp: Date
    } 
)

module.exports = model("Massages", massageSchema, "Massages"); 