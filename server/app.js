const dotenv = require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
let { socketConnection } = require("./controllers/chatControllers.js");
const { connectMongo } = require("./config/db.js");
const { errorHanlder } = require("./middlewares/error.js");
const { verifyJwtToken } = require("./middlewares/jwt.js")

const app = express();
let server = createServer(app);

app.use(cors({
  origin: process.env.FROTEND_URI,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongo();

let io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

socketConnection(io);

app.use(require("./routes/authRoutes.js"));
app.use(verifyJwtToken);
app.use(require("./routes/chatRoutes.js"));
app.use(require("./routes/profileRoutes.js"));

app.use(errorHanlder);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});