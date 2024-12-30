import React, { useState } from "react";

const AddEditNotes = ({ type, noteData, onClose, showToastMessage, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");

  const handleSave = async () => {
    // Mock API request to save or update note
    const apiEndpoint = type === "edit" ? `/update-note/${noteData._id}` : "/create-note";

    try {
      const response = await fetch(apiEndpoint, {
        method: type === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        showToastMessage(
          type === "edit" ? "Note updated successfully!" : "Note added successfully!",
          type
        );
        getAllNotes(); // Refresh the notes list
        onClose(); // Close the modal
      } else {
        console.error("Failed to save note");
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{type === "edit" ? "Edit Note" : "Add Note"}</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;