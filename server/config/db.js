const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

exports.main = async () => {
  try {
    await mongoose.connect(process.env.URL)
    console.log("database connected !")
  } catch (error) {
    console.log("database not connected")
  }
}