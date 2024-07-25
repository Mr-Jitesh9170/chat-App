const { Schema, model } = require("mongoose")

const notification = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        toUser: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        notifyMsg: String,
        isRead: {
            type: Boolean,
            default: false
        },
        timestamp: Date
    }
)

module.exports = model("notification", notification, "Notifications");