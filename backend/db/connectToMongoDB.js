const mongoose = require("mongoose");

const connectToMongoDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB Connection Established");
  } catch (error) {
    console.log("MongoDB Connection Failed :", error.message);
  }
};

module.exports = connectToMongoDB;
