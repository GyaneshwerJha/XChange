import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./root.css";
import "./App.css";
import NavBar from "./Components/NavBar"; // Ensure this path is correct
import Login from "./Components/Login";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Explore from "./Components/Explore";
import About from "./Components/About";
import ChatSidebar from "./Components/ChatSidebar";
import ChatWindow from "./Components/ChatWindow";
import UserProfile from "./Components/UserProfile";
import Connections from "./Components/Connections";
import Footer from "./Components/Footer";

const App = () => {
  const [user, setUser] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      updateUser(JSON.parse(userData));
    }
  }, []);

  const updateUser = (newUserData) => {
    localStorage.setItem("user", JSON.stringify(newUserData));
    setUser(newUserData);
  };

  const handleOpenChat = () => {
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
    setSelectedRecipient(null);
  };

  const handleSelectRecipient = (recipient) => {
    setSelectedRecipient(recipient);
  };

  const goBackToContacts = () => {
    setSelectedRecipient(null);
  };

  return (
    <Router>
      <NavBar user={user} updateUser={updateUser} />
      {user && (
        <button onClick={handleOpenChat} className="open-chat-app">
          Open Chat
        </button>
      )}
      {chatOpen && !selectedRecipient && (
        <ChatSidebar
          user={user}
          selectRecipient={handleSelectRecipient}
          closeChat={handleCloseChat}
        />
      )}
      {chatOpen && selectedRecipient && (
        <ChatWindow
          user={user}
          recipient={selectedRecipient}
          goBackToContacts={goBackToContacts}
          closeChat={handleCloseChat}
        />
      )}
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/signin" element={<Login updateUser={updateUser} />} />
        <Route path="/signup" element={<Signup updateUser={updateUser} />} />
        <Route
          path="/connections"
          element={<Connections updateUser={updateUser} />}
        />
        <Route
          path="/explore"
          element={<Explore user={user} updateUser={updateUser} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/myprofile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
