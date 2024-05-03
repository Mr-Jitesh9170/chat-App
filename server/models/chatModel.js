const { Schema, model } = require("mongoose")

const chatSchema = new Schema(
  {
    sender: String,
    message: String,
  },
  {
    timestamps: true
  }
)

module.exports = model("chat", chatSchema, "Chats") 