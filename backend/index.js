require('dotenv').config();

const express = require("express");
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("./db/connectToMongoDB.js");
const cors = require("cors");

// Routes
const authRoute = require("./routes/auth");
const messageRoute = require("./routes/message");
const userRoute = require("./routes/user");

const protectRoute = require("./middlewares/protectRoute.js");
const { app, server } = require('./socket/socket.js');

const PORT = process.env.PORT || 5000;

app.use(express.json()); // To parse the incoming requests with JSON paylaods (from req. body)
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',    // Replace with your frontend URL
  credentials: true,                  // Enable sending cookies in cross-origin requests, / Allows cookies to be sent and received
}));                                  // To allow cross-origin requests

app.use(protectRoute("jwt"));
app.use(express.urlencoded({ extended: true })); // To parse the incoming requests with urlencoded payloads (from req. body))

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

server.listen(PORT, () => {
  connectToMongoDB(process.env.MONGO_DB_URL); // To connect to MongoDB database
  console.log(`Server started: http://localhost:${PORT}`);
});
