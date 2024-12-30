import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home"; // Selection Page
import NotesDashboard from "./pages/NotesDashboard/NotesDashboard"; // Notes Dashboard
import FlashcardsDashboard from "./pages/FlashcardsDashboard/FlashcardsDashboard";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/dashboard" exact element={<Home />} /> {/* Selection Page */}
          <Route path="/notes" exact element={<NotesDashboard />} /> {/* Notes Dashboard */}
          <Route path="/flashcards" exact element={<FlashcardsDashboard />} /> {/* Flashcards Dashboard */}
          <Route path="/login" exact element={<Login />} />
          <Route path="/signUp" exact element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

// Define the Root component to handle the initial redirect
const Root = () => {
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default App;