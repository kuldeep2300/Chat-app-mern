const express = require("express");
const connectToMongoDB = require("./db/connectToMongoDB");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth.routes");

dotenv.config();

const app = express();

connectToMongoDB(process.env.MONGO_DB_URL);
const PORT = process.env.PORT || 5000;

app.use(express.json()); // To parse the incoming requests with JSON paylaods (from req. body)

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
