import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import "../Styles/Chat.css";

// ChatWindow Component
const ChatWindow = ({ user, recipient, closeChat, goBackToContacts }) => {
  // State variables for messages and new message input
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const ENDPOINT = `${process.env.REACT_APP_API_URL}`;

  // Effect to fetch chat history and set up socket connection
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    // Socket event to receive new messages
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    const fetchChatHistory = async () => {
      try {
        // Fetch chat history between user and recipient
        const response = await axios.get(
          `${ENDPOINT}/api/chat-history?sender=${user._id}&receiver=${recipient._id}`
        );
        setMessages(response.data.reverse());
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();

    return () => {
      // Cleanup socket connection
      socket.disconnect();
    };
  }, [user._id, recipient._id]);

  // Function to send a message
  const sendMessage = () => {
    const socket = socketIOClient(ENDPOINT);
    const messageData = {
      sender: user._id,
      receiver: recipient._id,
      content: newMessage,
    };
    socket.emit("sendMessage", messageData);

    // Add the new message to the local state
    const newMsg = { ...messageData, createdAt: new Date().toISOString() };
    setMessages((prevMessages) => [newMsg, ...prevMessages]);

    // Clear the new message input
    setNewMessage("");
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render the chat window
  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="back-button" onClick={goBackToContacts}>
          <img src="Images/arrow-back.svg" alt="" />
        </div>
        <div className="user-info">
          <div className="name-status">
            <div className="pfp-name">
              <img
                src={`${
                  process.env.REACT_APP_API_URL
                }/${recipient.profilePic.replace(/\\/g, "/")}`}
                onError={(e) => {
                  if (!e.target.src.endsWith("default-picture.png")) {
                    e.target.src = "Images/default-picture.png";
                  }
                }}
                alt="Profile"
                className="profile-image"
              />
              <div className="name">
                {recipient.firstName} {recipient.lastName}
              </div>
            </div>{" "}
            <div className="status">Active Right Now</div>
          </div>
        </div>
      </div>
      <div className="messages-container">
        {/* Render messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === user._id ? "my-message" : "their-message"
            }`}
          >
            <div>{msg.content}</div>
            <small>{formatDate(msg.createdAt)}</small>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        {/* New message input */}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        {/* Send button */}
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
