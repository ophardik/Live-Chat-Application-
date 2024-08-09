// const { Server } = require("socket.io");
// const http = require("http");
// const express = require("express");

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// const userSocketMap = {};

// const getReceiverSocketId = (receiverId) => {
//   console.log("Fetching socket ID for userId:", receiverId);
//   return userSocketMap[receiverId];
// };

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   const userId = socket.handshake.query.userId;

//   if (userId) {
//     userSocketMap[userId] = socket.id;
//     console.log(`UserID ${userId} mapped to socket ID: ${socket.id}`);
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     console.log("online users ",Object.keys(userSocketMap))
//   }

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);

//     for (const [key, value] of Object.entries(userSocketMap)) {
//       if (value === socket.id) {
//         delete userSocketMap[key];
//         console.log(`UserID ${key} removed from socket map`);
//         break;
//       }
//     }

//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });

//   socket.on("sendMessage", ({ receiverId, message }) => {
//     console.log(`Received sendMessage request with receiverId: ${receiverId}`);
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     console.log(`Sending message to socket ID: ${receiverSocketId}`);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", message);
//     } else {
//       console.log(`No socket found for receiverId: ${receiverId}`);
//       console.log("Current userSocketMap:", userSocketMap); // Log the userSocketMap for debugging
//     }
//   });
// });

// module.exports = { io, server, getReceiverSocketId };


const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
  console.log("Fetching socket ID for userId:", receiverId);
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`UserID ${userId} mapped to socket ID: ${socket.id}`);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("Online users:", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    for (const [key, value] of Object.entries(userSocketMap)) {
      if (value === socket.id) {
        delete userSocketMap[key];
        console.log(`UserID ${key} removed from socket map`);
        break;
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  socket.on("sendMessage", ({ receiverId, message }) => {
    console.log(`Received sendMessage request with receiverId: ${receiverId}`);
    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log(`Sending message to socket ID: ${receiverSocketId}`);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    } else {
      console.log(`No socket found for receiverId: ${receiverId}`);
      console.log("Current userSocketMap:", userSocketMap); // Log the userSocketMap for debugging
    }
  });
});

module.exports = { io, server, getReceiverSocketId };
