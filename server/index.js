const express = require("express");
const app = express();

// Database connections =>
const { connectMongo } = require("./config/db.js");
connectMongo();

// Middlewares => 
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes =>
app.use(require("./routes/authRoutes.js"));
app.use(require("./routes/chatRoutes.js"));
app.use(require("./routes/profileRoutes.js"));

// Server running =>
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
