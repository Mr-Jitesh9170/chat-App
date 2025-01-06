const { connect } = require("mongoose")

exports.connectMongo = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Database connected!")
  } catch (error) {
    console.log(error, " <--- Database disconnected!");
  }
}