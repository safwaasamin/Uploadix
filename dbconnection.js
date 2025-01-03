// const mongoose = require("mongoose");

// const connectdb = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://safwaasamin:WilD1234@cluster0.kuc2p.mongodb.net/demo_first?retryWrites=true&w=majority');
//         console.log("Database connected");
//     } catch (err) {
//         console.error("Database connection error:", err);
//     }
// };

// // Export the connection function
// module.exports = connectdb;


const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://safwaasamin:WilD1234@cluster0.kuc2p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            connectTimeoutMS: 30000, // Increase connection timeout
        });
        console.log("Database connected successfully!");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
