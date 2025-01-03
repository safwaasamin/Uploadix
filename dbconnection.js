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
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 30000, // 30 seconds
        });
        console.log("Database connected successfully!");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1); // Exit the app if connection fails
    }
};

module.exports = connectDB;
