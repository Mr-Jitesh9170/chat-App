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
    profilePhoto: {
      type: String,
      default: ""
    },
    number: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: ""
    },
    timeStamp: {
      type: Date,
      default: Date.now
    },
  }
)

module.exports = model("Register", registerSchema, "Register")