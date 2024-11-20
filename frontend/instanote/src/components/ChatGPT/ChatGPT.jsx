import React, { useState } from "react";
import "./ChatGPT.css";

const ChatGPT = ({ onClose, onCreateNote }) => {
  const [messages, setMessages] = useState([
    { text: "How can I help?", sender: "gpt" },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [note, setNote] = useState({ title: "", content: "" });
  const [awaitingTitle, setAwaitingTitle] = useState(false);
  const [awaitingContent, setAwaitingContent] = useState(false);

  // Improved function to detect note creation intent
  const detectNoteCreationIntent = (message) => {
    const lowerMessage = message.toLowerCase();

    // Keywords and phrases for note creation
    const keywords = [
      "create note",
      "add a note",
      "make a note",
      "new note",
      "write a note",
      "note",
    ];

    // Check if the message contains any of the keywords
    return keywords.some((keyword) => lowerMessage.includes(keyword));
  };

  // Helper function to parse commands for title and content
  const parseNoteCommand = (message) => {
    const regex = /(?:title[d]?\s?"(.*?)")?.*?(?:content\s?"(.*?)")?/i;
    const match = message.match(regex);

    const title = match && match[1] ? match[1] : null;
    const content = match && match[2] ? match[2] : null;

    return { title, content };
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    // Add user message to chat
    setMessages([...messages, { text: userMessage, sender: "user" }]);

    // Check if the user intends to create a note
    if (detectNoteCreationIntent(userMessage)) {
      const { title, content } = parseNoteCommand(userMessage);

      if (title && content) {
        // If both title and content are provided, create the note
        setMessages((prev) => [
          ...prev,
          { text: `Creating note titled "${title}" with content "${content}".`, sender: "gpt" },
        ]);
        onCreateNote({ title, content });
        setUserMessage("");
        return;
      }

      if (title) {
        // If only the title is provided, ask for the content
        setNote({ title, content: "" });
        setMessages((prev) => [
          ...prev,
          { text: `Got it! What would you like the content of "${title}" to be?`, sender: "gpt" },
        ]);
        setAwaitingContent(true);
        setAwaitingTitle(false);
        setUserMessage("");
        return;
      }

      // If no title or content is provided, ask for the title
      setMessages((prev) => [
        ...prev,
        { text: "What would you like to title the note?", sender: "gpt" },
      ]);
      setAwaitingTitle(true);
      setUserMessage("");
      return;
    }

    // Handle input when waiting for title
    if (awaitingTitle) {
      setNote((prev) => ({ ...prev, title: userMessage }));
      setMessages((prev) => [
        ...prev,
        { text: `Got it! What would you like the content of "${userMessage}" to be?`, sender: "gpt" },
      ]);
      setAwaitingTitle(false);
      setAwaitingContent(true);
      setUserMessage("");
      return;
    }

    // Handle input when waiting for content
    if (awaitingContent) {
      setNote((prev) => ({ ...prev, content: userMessage }));
      setMessages((prev) => [
        ...prev,
        { text: `Note created with title "${note.title}" and content "${userMessage}".`, sender: "gpt" },
      ]);
      onCreateNote({
        title: note.title,
        content: userMessage,
      });
      setAwaitingContent(false);
      setUserMessage("");
      return;
    }

    // Default response for other messages
    setMessages((prev) => [
      ...prev,
      { text: "I'm here to help! Let me know what you need.", sender: "gpt" },
    ]);

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