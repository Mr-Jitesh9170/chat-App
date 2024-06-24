const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
let server = createServer(app);

// Middlewares => 
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connections =>
const { connectMongo } = require("./config/db.js");
connectMongo();
const roomModel = require("./models/chatRoom.js")
// websocket connections =>
let io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// socket connection =>
io.on("connection", (socket) => {

  // room joined =>
  socket.on("roomJoin", async (roomNumber) => {
    let isRoom = await roomModel.findOne({ roomId: roomNumber.roomId })
    if (!isRoom) {
      socket.join(roomNumber.roomId);
    }
  })

  // chat massages =>
  socket.on("chat", (room, massage) => {
    io.to(room).emit("chat", { id: socket.id, massage, date: new Date() })
  })

  // room leaved =>
  socket.on("roomLeave", (roomNumber) => {
    socket.leave(roomNumber)
  })

  // user disconnected =>
  socket.on("disconnect", () => {
    console.log("User disconnected! , 🥹")
  });
});


// Routes =>
app.use(require("./routes/authRoutes.js"));
// app.use(require("./routes/chatRoutes.js"));
app.use(require("./routes/profileRoutes.js"));

// Server running =>
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});