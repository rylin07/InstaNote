import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import Toast from "../../components/ToastMessage/Toast";
import axiosInstance from "../../utils/axiosInstance";
import AddNotesImg from "../../assets/images/add-notes.svg";
import NoDataImg from "../../assets/images/no-data.svg";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const NotesDashboard = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "",
  });

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axiosInstance.delete(`/delete-note/${noteId}`);
      setAllNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      setShowToastMsg({
        isShown: true,
        message: "Note deleted successfully!",
        type: "delete",
      });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleModal = (type, data = null) => {
    setOpenAddEditModal({ isShown: true, type, data });
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                content={note.content}
                tags={note.tags}
                date={note.createdOn}
                isPinned={note.isPinned}
                onEdit={() => handleModal("edit", note)}
                onDelete={() => handleDeleteNote(note._id)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg}
            message="Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders."
          />
        )}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white fixed bottom-10 right-10 shadow-lg"
        onClick={() => handleModal("add")}
      >
        <MdAdd size={32} />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false })}
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-y-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false })}
          getAllNotes={getAllNotes}
          showToastMessage={(msg, type) =>
            setShowToastMsg({ isShown: true, message: msg, type })
          }
        />
      </Modal>
      {showToastMsg.isShown && <Toast message={showToastMsg.message} />}
    </>
  );
};

export default NotesDashboard;