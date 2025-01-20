import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const Flashcard = ({ flashcard, onEdit, onDelete }) => {
  return (
    <div className="flashcard border rounded p-4 bg-white shadow-md">
      <h3 className="text-xl font-semibold mb-2">{flashcard.title}</h3>
      <p className="text-gray-600">{flashcard.content}</p>
      {flashcard.tags && flashcard.tags.length > 0 && (
        <div className="mt-2">
          {flashcard.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={onEdit}
        >
          <MdEdit size={20} />
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={onDelete}
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default Flashcard;