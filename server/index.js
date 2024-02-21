const express = require("express");
const dotenv = require("dotenv");
const { main } = require("./config/db.js")
const registerUser = require("./routes/chatApp.js")
const cors = require("cors")
dotenv.config();

const app = express(); 

// middleware =>
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// database =>
main();






// routes =>
app.use("/chatApp", registerUser)

// port =>
app.listen(process.env.PORT, () => {
  console.log("Server is live on -> ", process.env.PORT);
});