import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ noteData, type, onClose, showToastMessage, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState("");

  const handleSaveNote = async () => {
    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    if (!content.trim()) {
      setError("Please enter content for the note.");
      return;
    }

    const endpoint = type === "edit" ? `/edit-note/${noteData._id}` : "/add-note";
    const method = type === "edit" ? "PUT" : "POST";

    try {
      const response = await axiosInstance({
        method,
        url: endpoint,
        data: { title, content, tags },
      });

      if (response.data) {
        showToastMessage(type === "edit" ? "Note updated successfully!" : "Note created successfully!", type);
        getAllNotes();
        onClose();
      }
    } catch (error) {
      console.error("Error saving note:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        onClick={onClose}
      >
        <MdClose size={24} />
      </button>

      <h2 className="text-2xl font-bold mb-6">
        {type === "edit" ? "Edit Note" : "Create Note"}
      </h2>

      <label className="block mb-2 font-medium text-gray-700">Title</label>
      <input
        type="text"
        placeholder="Enter a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-2 font-medium text-gray-700">Content</label>
      <textarea
        placeholder="Enter the content for your note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-4 p-2 border rounded h-32"
      />

      <label className="block mb-2 font-medium text-gray-700">Tags</label>
      <TagInput tags={tags} setTags={setTags} />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        onClick={handleSaveNote}
        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {type === "edit" ? "Update Note" : "Create Note"}
      </button>
    </div>
  );
};

export default AddEditNotes;