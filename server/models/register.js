const mongoose = require("mongoose")
let { Schema, model } = mongoose;

// Register Scheama =>
let registerScheama = new Schema(
  {
    name: {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      }
    }
    ,
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  }
)

// models =>
module.exports = model("register", registerScheama);