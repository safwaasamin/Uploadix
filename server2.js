const express =require("express");

const connectdb = require("./dbconnection");
const dotenv =require("dotenv").config();
connectdb();
const app=express();
const port = 5000;
app.use(express.json())

app.listen(port,() => {
   console.log(`server is running in ${port}`) 
})