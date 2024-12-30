import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome to InstaNote
        </h1>
        <p className="text-lg mb-8 text-gray-600">
          Choose between managing your Notes or Flashcards to get started.
        </p>
        <div className="flex gap-6">
          <button
            onClick={() => navigate("/notes")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Notes
          </button>
          <button
            onClick={() => navigate("/flashcards")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            Flashcards
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;