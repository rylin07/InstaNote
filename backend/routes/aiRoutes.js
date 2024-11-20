const express = require("express");
const multer = require("multer");
const { processImage } = require("../controllers/aiController");

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Route expects the uploaded file to be under the key "image"
router.post("/process-image", upload.single("image"), processImage);

module.exports = router;
