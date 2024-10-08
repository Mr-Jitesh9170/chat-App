const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
   
const app = express();
let server = createServer(app);

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST'],
  credentials: true                            
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connections =>
const { connectMongo } = require("./config/db.js");
connectMongo();

// websocket connections =>
let io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// socket connections =>
let { socketConnection } = require("./controllers/chatControllers.js");
socketConnection(io);

// Routes =>
app.use(require("./routes/notificationRoutes.js"));
app.use(require("./routes/authRoutes.js"));
app.use(require("./routes/chatRoutes.js"));
app.use(require("./routes/profileRoutes.js"));

// Server running =>
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});