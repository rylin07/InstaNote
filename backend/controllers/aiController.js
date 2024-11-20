const Tesseract = require("tesseract.js");
const openai = require("openai");
const fs = require("fs");
require("dotenv").config();

// Initialize OpenAI API with API key from .env
openai.apiKey = process.env.OPENAI_API_KEY;

/**
 * Function to process an uploaded image:
 * - Perform OCR to extract text using Tesseract.js
 * - Generate a note draft using OpenAI's GPT model
 */
const processImage = async (req, res) => {
  try {
    const { path } = req.file;

    console.log("Starting OCR process...");

    // Perform OCR
    const {
      data: { text },
    } = await Tesseract.recognize(path, "eng");

    console.log("OCR completed. Extracted text:", text);

    if (!text.trim()) {
      fs.unlink(path, (err) => {
        if (err) console.error("Failed to delete file:", err);
      });
      return res.status(400).json({ error: "No readable text found in the image." });
    }

    console.log("Sending text to OpenAI for note generation...");

    // Use OpenAI to generate a note draft
    const response = await openai.Completion.create({
      model: "text-davinci-003",
      prompt: `Create a concise and structured note draft from the following text:\n\n${text}`,
      max_tokens: 300,
    });

    const noteDraft = response.choices[0].text.trim();

    console.log("Note draft generated:", noteDraft);

    fs.unlink(path, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    res.status(200).json({ noteDraft });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Failed to process the image. Please try again." });
  }
};

module.exports = { processImage };