const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
// const connectdb =
const mongoose = require("mongoose");

const app = express();
const uploadDir = path.join(__dirname, "uploads");

// Connect to MongoDB
const connectDB = require("./dbconnection");
connectDB();

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Mongoose Model for file data
const fileSchema = new mongoose.Schema({
  filename: String,
  uploadDate: Date,
  path: String,
});

const File = mongoose.model("File", fileSchema);

// File Upload Endpoint
app.post("/upload", async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    console.log("File received:", req.file);

    const fileDocument = new FileModel({
      filename: req.file.originalname,
      fileSize: req.file.size,
      contentType: req.file.mimetype,
    });

    const savedFile = await fileDocument.save();
    console.log("File saved:", savedFile);

    res.status(200).send("File uploaded and saved to MongoDB!");
  } catch (error) {
    console.error("Error during file upload:", error.message);
    res.status(500).send("Internal server error");
  }
});

// Search Endpoint
app.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const files = await File.find({ filename: new RegExp(query, "i") }); // Use Mongoose to search
    res.status(200).json(files);
  } catch (err) {
    console.error("Error retrieving from MongoDB:", err);
    res.status(500).json({ message: "Error retrieving files." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
