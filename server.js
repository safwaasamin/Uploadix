const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const connectdb = require("./dbconnection");
const mongoose = require("mongoose");

const app = express();
const uploadDir = path.join(__dirname, "uploads");

// Connect to MongoDB
connectdb();

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
app.post("/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    const fileData = {
        filename: file.originalname,
        uploadDate: new Date(),
        path: file.path,
    };

    try {
        await File.create(fileData); // Save the file data using Mongoose
        res.status(200).json({ message: "File uploaded and saved to MongoDB!" });
    } catch (err) {
        console.error("Error saving to MongoDB:", err);
        res.status(500).json({ message: "Error saving file data." });
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
