const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db
const { connectMongo } = require("./config/db.js");
connectMongo();


const server = createServer(app);

// socket =>
const io = new Server(server);


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

 


app.use(require("./routes/authRoutes.js"));
app.use(require("./routes/chatRoutes.js"))

// Server running
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
