const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);

// It can give error that's why we pass second argument.
const io = new Server(server, {
  // by doing this first we have express server in which only client request to the server and server respond to the client and req-res cycle end, but here this line make socket server and wrap inside the express server, and now the server is from socket.io which help us to send req to the server and here server can also send req to the client, enable two way or duplex communication service.
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

// To set up the real-time communication using socket.io, here we are passing receiver userId and return receiver socketId
const getReceivedSocketId = (receiverId) => {   
  return userSocketMap[receiverId]
}

// Here we are storing user that is online
const userSocketMap = {}; // {userId: socketId} -> socket.id is unique for each user, userId is unique for each user, so we will storing online user socket id into the userId property inside the object. Here we creating the object because we are storing all the online users from the different devices that's why we use obejects.

// Listen for connection here socket is user
io.on("connection", (socket) => {
  // console.log("A user connected:", socket.id);
  const userId = socket.handshake.query.userId;                     // socket.handshake.query.userId is used to get the userId from the frontend query

  if(userId !== 'undefined'){        
                                   // if userId is not undefined then only we will store the user socket id into the userSocketMap object 
    userSocketMap[userId] = socket.id ;                              // this code store user in the object like this -> {userId: socketId}
                                                                    // socket.id is unique for each user, userId is unique for each user, so we will storing online user socket id into the userId property inside the object.
  }

  // io.emit() is used to send events to all the connected clients.  // Since we connected or store the online user in the userSocketMap object, so we will emit (send) the event to the all clients that user is online. Here we are sending Object.keys(userSocketMap) meaning we are sending all the userId key values to the clients so that they can see anyone who is online.
  io.emit("getOnlineUsers", Object.keys(userSocketMap));       // This sends user IDs because we only passing the key value instead of socket IDs
                                                                    // socket.on() is used to listen to the events, can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userId];                                   // This line is used to delete the user from the userSocketMap object (meaning deleting the user from the online user list) when user disconnects from the server. 
    io.emit("getOnlineUsers", Object.keys(userSocketMap));          // Since we are deleting the offline user so we have to reload the online user list to the clients so that they can see the updated online user list.
  });
});

module.exports = { app, server, io, getReceivedSocketId };
