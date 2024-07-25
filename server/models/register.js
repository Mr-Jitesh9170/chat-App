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
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9LJ-AHFG7OTn0OFl7v2m8elkhlz2iIodFuXpBTVROwQ&s"
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
    isOnline: {
      type: Boolean,
      default: false
    },
    lastSeen: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timpestamp: true
  }
)

module.exports = model("User", registerSchema);