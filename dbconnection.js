const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI; // Use environment variable for MongoDB URI
    await mongoose.connect('mongodb+srv://safwaasamin:WilD1234@cluster0.kuc2p.mongodb.net/demo_first?retryWrites=true&w=majority');

    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Export the connection function
module.exports = connectDB;
