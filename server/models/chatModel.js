const { Schema, model } = require("mongoose")

const chatSchema = new Schema(
  {
    sender: String,
    message: String,
    timestamp: Date
  }
)

module.exports = model("chat", chatSchema, "Chats") 