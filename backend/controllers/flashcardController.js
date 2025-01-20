const Flashcard = require('../models/flashcard.model');

// Create a new flashcard
exports.createFlashcard = async (req, res) => {
  try {
    const { question, answer, tags } = req.body;
    const flashcard = new Flashcard({
      question,
      answer,
      tags,
      userId: req.user._id,
    });
    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create flashcard', error });
  }
};

// Get all flashcards for a user
exports.getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ userId: req.user._id });
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve flashcards', error });
  }
};

// Update a flashcard
exports.updateFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, tags } = req.body;
    const flashcard = await Flashcard.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { question, answer, tags },
      { new: true }
    );
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    res.status(200).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update flashcard', error });
  }
};

// Delete a flashcard
exports.deleteFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const flashcard = await Flashcard.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    res.status(200).json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete flashcard', error });
  }
};