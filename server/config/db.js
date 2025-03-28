const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

// Get the absolute path to the .env file
const envPath = path.resolve(__dirname, "../../.env");
console.log("Looking for .env file at:", envPath);
console.log("File exists:", fs.existsSync(envPath));

// Load environment variables
require("dotenv").config({ path: envPath });

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/";
    console.log("Attempting to connect to MongoDB...");
    console.log("MONGODB_URI:", MONGODB_URI);

    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("Database name:", conn.connection.name);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
};

module.exports = connectDB;
