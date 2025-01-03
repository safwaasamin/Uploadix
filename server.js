const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config(); // Load environment variables

const app = express();
const uploadDir = path.join(__dirname, "uploads");
const connectDB = require("./dbconnection");

// Connect to MongoDB
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
app.use(express.json());

// Mongoose Model for file data
const fileSchema = new mongoose.Schema({
  filename: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  path: String,
});

const File = mongoose.model("File", fileSchema);

// File Upload Endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // Save file details to MongoDB
    const fileDocument = new File({
      filename: req.file.filename,
      path: req.file.path,
    });

    const savedFile = await fileDocument.save();
    console.log("File saved:", savedFile);

    res.status(200).send({
      message: "File uploaded and saved to MongoDB!",
      file: savedFile,
    });
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
    console.error("Error retrieving from MongoDB:", err.message);
    res.status(500).json({ message: "Error retrieving files." });
  }
});

// Server Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
