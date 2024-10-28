require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("./db/connectToMongoDB.js");
const cors = require("cors");
const path = require("path");

// Routes
const authRoute = require("./routes/auth");
const messageRoute = require("./routes/message");
const userRoute = require("./routes/user");

const protectRoute = require("./middlewares/protectRoute.js");
const { app, server } = require("./socket/socket.js");

const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve(); // Make sure this line is declared correctly

app.use(express.json()); // To parse the incoming requests with JSON paylaods (from req. body)
app.use(cookieParser());

app.use(
  cors({
    origin: "https://chat-app-mern-dh70.onrender.com", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
    credentials: true, // Enable sending cookies in cross-origin requests, / Allows cookies to be sent and received
  })
); // To allow cross-origin requests

app.use(protectRoute("jwt"));
app.use(express.urlencoded({ extended: true })); // To parse the incoming requests with urlencoded payloads (from req. body))

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

// Middleware - // Serve static files from the correct path
app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB(process.env.MONGO_DB_URL); // To connect to MongoDB database
  console.log(`Server started: https://localhost:${PORT}`);
});
