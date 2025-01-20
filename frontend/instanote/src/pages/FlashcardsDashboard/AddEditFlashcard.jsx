import React, { useState } from "react";

const AddEditFlashcard = ({ type, flashcardData, onClose, showToastMessage, getAllFlashcards }) => {
  const [title, setTitle] = useState(flashcardData?.title || "");
  const [content, setContent] = useState(flashcardData?.content || "");
  const [tags, setTags] = useState(flashcardData?.tags?.join(", ") || "");

  const handleSave = async () => {
    try {
      const endpoint = type === "edit" ? `/update-flashcard/${flashcardData._id}` : "/create-flashcard";
      const method = type === "edit" ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tags: tags.split(",").map(tag => tag.trim()) }),
      });

      if (response.ok) {
        showToastMessage(
          type === "edit" ? "Flashcard updated successfully!" : "Flashcard added successfully!",
          type
        );
        getAllFlashcards();
        onClose();
      } else {
        console.error("Error saving flashcard");
      }
    } catch (error) {
      console.error("Failed to save flashcard:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{type === "edit" ? "Edit Flashcard" : "Add Flashcard"}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 w-full mb-4"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="border p-2 w-full mb-4"
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
        className="border p-2 w-full mb-4"
      />
      <div className="flex justify-end gap-4">
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default AddEditFlashcard;