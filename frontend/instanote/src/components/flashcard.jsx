import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ flashcard, onEdit, onDelete }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
      <div className="front">
        <p>{flashcard.question}</p>
      </div>
      <div className="back">
        <p>{flashcard.answer}</p>
      </div>
      <div className="actions">
        <button onClick={(e) => { e.stopPropagation(); onEdit(flashcard); }}>Edit</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(flashcard.id); }}>Delete</button>
      </div>
    </div>
  );
};

export default Flashcard;