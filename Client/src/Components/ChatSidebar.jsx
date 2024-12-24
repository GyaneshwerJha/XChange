import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Chat.css";

// ChatSidebar Component
const ChatSidebar = ({ user, selectRecipient, closeChat }) => {
  // State to store users
  const [users, setUsers] = useState([]);
  const ENDPOINT = `${process.env.REACT_APP_API_URL}`;

  // Effect to fetch chat users when the component mounts or user changes
  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        // Fetch users who are part of the chat
        const response = await axios.get(
          `${ENDPOINT}/api/chat-users?userId=${user._id}`
        );
        // For each user, fetch their last message
        const usersWithLastMessages = await Promise.all(
          response.data.map(async (user) => {
            const lastMessageResponse = await axios.get(
              `${ENDPOINT}/api/messages/recipient?recipientId=${user._id}`
            );
            // Assuming the messages are sorted by createdAt descending order
            const lastMessage = lastMessageResponse.data[0];
            return {
              ...user,
              lastMessage: lastMessage ? lastMessage.content : "",
              lastMessageTime: lastMessage ? lastMessage.createdAt : "",
            };
          })
        );
        setUsers(usersWithLastMessages);
      } catch (error) {
        console.error("Error fetching chat users:", error);
      }
    };

    fetchChatUsers();
  }, [user._id]);

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

  // Render the chat sidebar
  return (
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
            className="contact"
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
              </div>{" "}
              <div className="last-message">{user.lastMessage}</div>
              <div className="timestamp">
                {user.lastMessageTime ? formatDate(user.lastMessageTime) : ""}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
