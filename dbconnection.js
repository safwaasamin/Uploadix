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

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://<username>:<password>@cluster0.kuc2p.mongodb.net/<database>?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000, // Increase connection timeout to 30s
            socketTimeoutMS: 30000, // Increase socket timeout to 30s
        });

        mongoose.set('bufferCommands', false); // Disable buffering for operations
        mongoose.set('strictQuery', false);   // To avoid query warnings

        console.log("Database connected successfully!");
    } catch (err) {
        console.error("Database connection error:", err.message);
    }
};

module.exports = connectdb;
