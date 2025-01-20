const express = require('express');
const flashcardController = require('../controllers/flashcardController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Routes for flashcards
router.post('/', authenticate, flashcardController.createFlashcard);
router.get('/', authenticate, flashcardController.getFlashcards);
router.put('/:id', authenticate, flashcardController.updateFlashcard);
router.delete('/:id', authenticate, flashcardController.deleteFlashcard);

module.exports = router;