const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const session = require("express-session")
const cors = require("cors");
const { sessionChecker } = require("./middleware/session.js")



const app = express();
let server = createServer(app);

// Middlewares => 
app.use(session({
  secret: '12345',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(sessionChecker);

app.use(cors());
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


app.get('/set-session', (req, res) => {
  req.session.user = 'John Doe';
  res.send('Session data set');
});

app.get('/get-session', (req, res) => {
  res.send(`Session data: ${req.session.user}`);
});


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