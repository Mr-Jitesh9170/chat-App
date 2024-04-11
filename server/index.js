const { Server } = require("socket.io")
const { createServer } = require("node:http")
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



//================================= SOCKET ============>
const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  
  console.log(socket, 'a user connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('chat', (msg) => {
    io.emit('chat message', msg); // Broadcast the message to all connected clients
   });

});
// ===================================================>


// Routes =>
app.use(require("./routes/authRoutes.js"));
app.use(require("./routes/chatRoutes.js"));
app.use(require("./routes/profileRoutes.js"));

// Server running =>
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
