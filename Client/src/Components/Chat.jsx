import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import "../Styles/Chat.css";

// Chat Component
const Chat = ({ user, recipient, closeChat }) => {
  // state variables for sender, receiver, message, new message getting sent...
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [chatOpen, setChatOpen] = useState(true);
  const [selectedRecipient, setSelectedRecipient] = useState(recipient);
  const ENDPOINT = `${process.env.REACT_APP_API_URL}`;

  // fetch the data when user opens the chat
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    // Socket event to receive new messages
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    const fetchChatHistory = async () => {
      // Fetch chat history between user and recipient
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/chat-history?sender=${user._id}&receiver=${recipient._id}`
      );
      setMessages(response.data.reverse());
    };

    fetchChatHistory();

    // Fetch users at the start
    fetchChatUsers();

    return () => {
      // Cleanup socket connection
      socket.disconnect();
    };
  }, [user._id, recipient._id]);

  // Effect to fetch chat users when visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchChatUsers();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Function to fetch chat users
  const fetchChatUsers = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/chat-users?userId=${user._id}`
    );
    const usersWithLastMessages = await Promise.all(
      response.data.map(async (user) => {
        const lastMessageResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/messages/recipient?recipientId=${user._id}`
        );
        const lastMessage = lastMessageResponse.data[0];
        return {
          ...user,
          lastMessage: lastMessage ? lastMessage.content : "",
          lastMessageTime: lastMessage ? lastMessage.createdAt : "",
        };
      })
    );
    setUsers(usersWithLastMessages);
  };

  // Effect to fetch chat users when chat is closed
  useEffect(() => {
    if (!chatOpen) {
      fetchChatUsers();
    }
  }, [chatOpen]);

  // Function to select a recipient and fetch chat history
  const selectRecipient = async (selectedUser) => {
    setSelectedRecipient(selectedUser);
    setChatOpen(true);

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/chat-history?sender=${user._id}&receiver=${selectedUser._id}`
    );
    setMessages(response.data.reverse());
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

  // Function to send a message
  const sendMessage = () => {
    const socket = socketIOClient(ENDPOINT);
    const messageData = {
      sender: user._id,
      receiver: selectedRecipient._id,
      content: newMessage,
    };

    // Emit the message to the server
    socket.emit("sendMessage", messageData);

    // Add the new message to the local state
    const newMsg = {
      sender: user._id,
      receiver: selectedRecipient._id,
      content: newMessage,
      createdAt: new Date().toISOString(),
    };
    setMessages((prevMessages) => [newMsg, ...prevMessages]);

    // Update chat users with the new last message
    const updatedUsers = users.map((u) =>
      u._id === selectedRecipient._id
        ? {
            ...u,
            lastMessage: newMessage,
            lastMessageTime: newMsg.createdAt,
          }
        : u
    );

    // Check if the conversation is new and add it to the list if it doesn't exist
    if (!updatedUsers.some((u) => u._id === selectedRecipient._id)) {
      updatedUsers.push({
        ...selectedRecipient,
        lastMessage: newMessage,
        lastMessageTime: newMsg.createdAt,
      });
    }

    setUsers(updatedUsers);

    setNewMessage("");
  };

  // Function to go back to contacts view
  const goBackToContacts = () => {
    // Update the last message and its time
    const lastSentMessage = messages.length > 0 ? messages[0] : null;
    const selectedUserIndex = users.findIndex(
      (user) => user._id === selectedRecipient._id
    );
    const updatedUsers = [...users];
    if (selectedUserIndex !== -1 && lastSentMessage) {
      updatedUsers[selectedUserIndex] = {
        ...updatedUsers[selectedUserIndex],
        lastMessage: lastSentMessage.content,
        lastMessageTime: lastSentMessage.createdAt,
      };
      setUsers(updatedUsers);
    }

    setChatOpen(false);
  };

  // Function to handle closing the chat
  const closeChatHandler = () => {
    closeChat();
  };

  // Render chat component
  return (
    <div className="app-container">
      {!chatOpen && (
        <div className="chat-sidebar">
          <div className="chat-header-contacts">
            <p className="close-chat-btn" onClick={closeChat}>
              ×
            </p>
            <h3>Chat</h3>
          </div>
          <div className="search-container">
            <input type="text" placeholder="Search" />
          </div>
          <div className="contacts-container">
            {users.map((user, index) => (
              <div
                key={user._id}
                className={`contact ${
                  selectedRecipient === user ? "active" : ""
                }`}
                onClick={() => selectRecipient(user)}
              >
                <div className="contact-info">
                  <div className="pfp-name">
                    <img
                      src={`${
                        process.env.REACT_APP_API_URL
                      }/${user.profilePic.replace(/\\/g, "/")}`}
                      onError={(e) => {
                        if (!e.target.src.endsWith("default-picture.png")) {
                          e.target.src = "Images/default-picture.png";
                        }
                      }}
                      alt="Profile"
                      className="profile-image"
                    />
                    <div className="name">
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                  <div className="last-message">{user.lastMessage}</div>
                  <div className="timestamp">
                    {user.lastMessageTime
                      ? formatDate(user.lastMessageTime)
                      : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {chatOpen && (
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
                    }/${selectedRecipient.profilePic.replace(/\\/g, "/")}`}
                    onError={(e) => {
                      if (!e.target.src.endsWith("default-picture.png")) {
                        e.target.src = "Images/default-picture.png";
                      }
                    }}
                    alt="Profile"
                    className="profile-image"
                  />
                  <div className="name">
                    {selectedRecipient.firstName} {selectedRecipient.lastName}
                  </div>
                </div>
                <div className="status">Active Right Now</div>
              </div>
            </div>
          </div>
          <div className="messages-container">
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
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
