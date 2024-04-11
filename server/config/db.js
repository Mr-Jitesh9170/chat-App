const { connect } = require("mongoose")

exports.connectMongo = async () => {
  try {
    const URL = "mongodb://127.0.0.1:27017/Chat-App"
    await connect(URL);
    console.log("mongodb connected !!")
  } catch (error) {
    console.log(error, " <--- mongodb not connected ")
  }
} 