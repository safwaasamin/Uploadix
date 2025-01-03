const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI; // Use environment variable for MongoDB URI
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, // Ensures compatibility with MongoDB URI
      useUnifiedTopology: true, // Handles new server discoveries
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Export the connection function
module.exports = connectDB;
