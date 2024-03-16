const { Schema, model } = require("mongoose")


const registerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
    }
  }
)

module.exports = model("Register", registerSchema, "Register")