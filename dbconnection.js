// // const mongoose= require("mongoose") 
// // const connectdb=async()=>{
// //   try{
// // const connect=await mongoose.connect(process.env.connectionstring);
// // console.log("connection successful",connect.connection.host,connect.connection.name)
// //   }  catch(err) {
// //     console.log(err);
// //     process.exit(1);

// //   }
// // };
// // module.exports=connectdb;

// require('dotenv').config();  // Load environment variables
// const mongoose = require('mongoose');

// const connectdb = () => {
//   const connectionString = process.env.MONGODB_URI;

//   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Database connected'))
//     .catch(err => console.error('Database connection error:', err));
// };

// // Export the connectdb function
// module.exports = connectdb;

const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
        });
        mongoose.set('bufferCommands', false);
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};

module.exports = connectdb;
