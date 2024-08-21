const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const MongoStore = require('connect-mongo');
const session = require('express-session');
const { sessionChecker } = require("./middleware/session.js")

const app = express();
let server = createServer(app);

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',               // React frontend URL
  methods: ['GET', 'POST'],
  credentials: true                             // Allow credentials (cookies) to be sent
}));

// Session setup 
app.use(session({
  secret: '12345',                   // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/Chat-App',
    collectionName: 'sessions',
    serialize: (session) => {
      // Convert session to an object
      return session;
    },
    deserialize: (session) => {
      // Convert session back to its original form
      return session;
    }
  }),
  cookie: {
    secure: false,                                  // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24                     // 1 day
  }
}));
// app.use(sessionChecker);

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