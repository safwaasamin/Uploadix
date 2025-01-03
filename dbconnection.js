const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb+srv://safwaasamin:WilD1234@cluster0.kuc2p.mongodb.net/demo_first?retryWrites=true&w=majority');
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};

// Export the connection function
module.exports = connectdb;