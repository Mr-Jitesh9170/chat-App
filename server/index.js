const express = require("express");
const dotenv = require("dotenv");
const { main } = require("./config/db.js")
const registerUser = require("./routes/chatApp.js")
dotenv.config();

const app = express();

// database =>
main();






// routes =>
app.use("/chatApp", registerUser)

// port =>
app.listen(process.env.PORT, () => {
  console.log("Server is live on -> ", process.env.PORT);
});