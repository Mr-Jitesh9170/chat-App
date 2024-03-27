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


// Routes =>
app.use(require("./routes/authRoutes.js"));
app.use(require("./routes/chatRoutes.js"))

// Server running =>
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
