const express = require("express");
const connectToMongoDB = require("./db/connectToMongoDB");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// Routes
const authRoute = require("./routes/auth");
const messageRoute = require("./routes/message");
const userRoute = require("./routes/user");

dotenv.config();

const app = express();

connectToMongoDB(process.env.MONGO_DB_URL);
const PORT = process.env.PORT || 5000;

app.use(express.json()); // To parse the incoming requests with JSON paylaods (from req. body)
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
