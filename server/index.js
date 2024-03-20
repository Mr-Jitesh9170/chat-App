const express = require("express")
const { connectMongo } = require("./config/db.js")
const app = express();


// db =>
connectMongo();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require("./routes/authRoutes.js"))

 
app.listen(8080, () => {
  console.log("server is running on  -> 8080")
})