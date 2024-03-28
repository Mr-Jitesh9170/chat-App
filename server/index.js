const express = require("express");
const app = express();
const cors = require("cors");


// Middlewares => 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connections =>
const { connectMongo } = require("./config/db.js");
connectMongo();


// const crypto = require('crypto');
// // Generate a random secret key
// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log("Randomly generated secret key:", secretKey);

// Routes =>
app.use(require("./routes/authRoutes.js"));
app.use(require("./routes/chatRoutes.js"))

// Server running =>
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
