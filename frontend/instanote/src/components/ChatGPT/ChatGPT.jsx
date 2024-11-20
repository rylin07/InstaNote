import React, { useState } from "react";
import "./ChatGPT.css";

const ChatGPT = ({ onClose, onCreateNote }) => {
  const [messages, setMessages] = useState([
    { text: "How can I help?", sender: "gpt" },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [note, setNote] = useState({ title: "", content: "" }); // State for note data
  const [awaitingTitle, setAwaitingTitle] = useState(false); // Awaiting user input for title
  const [awaitingContent, setAwaitingContent] = useState(false); // Awaiting user input for content

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    // Add user message to chat
    setMessages([...messages, { text: userMessage, sender: "user" }]);

    // Handle note creation logic
    if (awaitingTitle) {
      setNote((prev) => ({ ...prev, title: userMessage }));
      setMessages((prev) => [
        ...prev,
        { text: "What would you like the content of the note to be?", sender: "gpt" },
      ]);
      setAwaitingTitle(false);
      setAwaitingContent(true);
      setUserMessage("");
      return;
    }

    if (awaitingContent) {
      setNote((prev) => ({ ...prev, content: userMessage }));
      setMessages((prev) => [
        ...prev,
        { text: "Note created! Opening the editor...", sender: "gpt" },
      ]);
      setUserMessage("");
      setAwaitingContent(false);

      // Trigger note creation modal with pre-filled data
      onCreateNote({
        title: note.title,
        content: userMessage,
      });
      return;
    }

    // Simulate GPT response (general interaction)
    setTimeout(() => {
      if (userMessage.toLowerCase().includes("create a note")) {
        setMessages((prev) => [
          ...prev,
          { text: "What would you like to title the note?", sender: "gpt" },
        ]);
        setAwaitingTitle(true);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "I'm here to help! Let me know what you need.", sender: "gpt" },
        ]);
      }
    }, 1000);

    // Clear input field
    setUserMessage("");
  };

  return (
    <div className="chatgpt-container">
      <div className="chatgpt-header">
        <h2>AI Chat</h2>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="chatgpt-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatgpt-message ${
              message.sender === "user" ? "user-message" : "gpt-message"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatgpt-input">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatGPT;