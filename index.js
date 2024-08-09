const express = require("express");
const http = require("http");
const connectToMongoDb = require("./connection");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { io, server } = require('./Socket/sockets'); // Ensure path is correct
require('dotenv').config();

const app = express();

const PORT = 8002;
const SOCKET_PORT = 8005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOption));

app.use("/api", userRoute);
app.use("/message", messageRoute);

// MongoDB connection
connectToMongoDb("mongodb+srv://hardik:1234@cluster0.od2bvnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Start Express server
app.listen(PORT, () => {
  console.log(`Express server started on http://localhost:${PORT}`);
});

// Start Socket.IO server
server.listen(SOCKET_PORT, () => {
  console.log(`Socket.IO server is running on http://localhost:${SOCKET_PORT}`);
});
