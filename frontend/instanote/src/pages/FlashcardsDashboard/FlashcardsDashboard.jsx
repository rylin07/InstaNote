import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Flashcard from "../../components/cards/Flashcard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditFlashcard from "./AddEditFlashcard";
import Toast from "../../components/ToastMessage/Toast";
import axiosInstance from "../../utils/axiosInstance";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddFlashcardsImg from "../../assets/images/add-notes.svg";
import NoDataImg from "../../assets/images/no-data.svg";

const FlashcardsDashboard = () => {
  const [allFlashcards, setAllFlashcards] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const handleEdit = (flashcardDetails) => {
    setOpenAddEditModal({ isShown: true, data: flashcardDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message: message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const getAllFlashcards = async () => {
    try {
      const response = await axiosInstance.get("/get-all-flashcards");

      if (response.data && response.data.flashcards) {
        setAllFlashcards(response.data.flashcards);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const deleteFlashcard = async (data) => {
    const flashcardId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-flashcard/" + flashcardId);

      if (response.data && !response.data.error) {
        showToastMessage("Flashcard Deleted Successfully", "delete");
        getAllFlashcards();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const onSearchFlashcard = async (query) => {
    try {
      const response = await axiosInstance.get("/search-flashcards", {
        params: { query },
      });

      if (response.data && response.data.flashcards) {
        setIsSearch(true);
        setAllFlashcards(response.data.flashcards);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllFlashcards();
  };

  useEffect(() => {
    getAllFlashcards();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchFlashcard}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto">
        {isSearch && (
          <h3 className="text-lg font-medium mt-5">Search Results</h3>
        )}

        {allFlashcards.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allFlashcards.map((item) => (
              <Flashcard
                key={item._id}
                flashcard={item}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteFlashcard(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddFlashcardsImg}
            message={
              isSearch
                ? `Oops! No flashcards found matching your search.`
                : `Start creating your first flashcard! Click the 'Add' start.`
            }
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add/Edit Flashcard Modal"
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditFlashcard
          type={openAddEditModal.type}
          flashcardData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          showToastMessage={showToastMessage}
          getAllFlashcards={getAllFlashcards}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default FlashcardsDashboard;