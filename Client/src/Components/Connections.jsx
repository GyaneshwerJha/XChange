import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Styles/Connections.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import Chat from "./Chat";
import RatingModal from "./RatingModal";

const Connections = ({ updateUser }) => {
  // State variables
  const [connections, setConnections] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [user, setUser] = useState({});
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRefs = useRef({});
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [userToRate, setUserToRate] = useState(null);

  // Function to open chat with a recipient
  const openChat = (recipient) => {
    setSelectedRecipient(recipient);
    setChatOpen(true);
  };

  // Function to toggle dropdown menu
  const toggleDropdown = (contactId) => {
    if (dropdownOpen === contactId) {
      setDropdownOpen(null);
      document.removeEventListener("mousedown", handleClickOutside);
    } else {
      setDropdownOpen(contactId);
      document.addEventListener("mousedown", handleClickOutside);
    }
  };

  // Function to handle click outside dropdown
  const handleClickOutside = (event) => {
    if (
      dropdownOpen !== null &&
      dropdownRefs.current[dropdownOpen] &&
      !dropdownRefs.current[dropdownOpen].contains(event.target)
    ) {
      setDropdownOpen(null);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  // Function to handle unenroll action
  const handleUnenroll = async (userId) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/${user._id}/disconnect`,
        { connectUserId: userId }
      );
      await fetchConnections();
      updateUser(data); // Update user state with the response data
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  // Function to fetch user connections
  const fetchConnections = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || !userData._id) {
      console.error("No user data available");
      return;
    }
    setUser(userData);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/${userData._id}/connections`
      );
      setConnections(response.data);
      console.log(connections);
    } catch (error) {
      console.error("Failed to fetch connections:", error);
    }
  };

  // Function to open the modal with the selected user
  const openRatingModal = (contact) => {
    setSelectedRecipient(contact); // Set the recipient state to the selected contact
    setUserToRate(`${contact.firstName} ${contact.lastName}`);
    setIsRatingModalOpen(true);
  };

  // Function to close the modal
  const closeRatingModal = () => {
    setIsRatingModalOpen(false);
  };

  // Function to submit the rating
  const submitRating = async (ratingValue) => {
    console.log(selectedRecipient, user);
    if (!selectedRecipient || !user) {
      console.error("Rating submission error: Missing user information.");
      return;
    }

    try {
      const endpoint = `${process.env.REACT_APP_API_URL}/api/users/${selectedRecipient._id}/rate`;

      const ratingData = {
        raterId: user._id, // ID of the user submitting the rating
        value: ratingValue, // The rating value
      };

      const response = await axios.post(endpoint, ratingData);

      console.log("Rating submitted successfully:", response.data);
      setIsRatingModalOpen(false);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    if (dropdownOpen !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <div className="connections-main-container">
        <div className="connections-container">
          <div className="connection-banner-text">
            <h2>Connections</h2>
          </div>
          <div className="connections-banner">
            <div className="search-input">
              <div className="search-box">
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                <input className="search" type="text" placeholder="Search" />
              </div>
            </div>
            <div className="add-contact">
              <div className="circle">
                <div className="plus-icon">
                  <FontAwesomeIcon icon={faPlus} size="2x" />
                </div>
              </div>
            </div>
          </div>
          <hr className="connections-separator" />
          <div className="all-contacts">
            {connections.map((contact, index) => (
              <div className="contact-example" key={index}>
                <div className="left-side">
                  <div className="avatar-pic">
                    <div className="circle">
                      <img
                        src={`${
                          process.env.REACT_APP_API_URL
                        }/${contact.profilePic.replace(/\\/g, "/")}`}
                        onError={(e) => {
                          if (!e.target.src.endsWith("default-picture.png")) {
                            e.target.src = "Images/default-picture.png";
                          }
                        }}
                        alt="Profile"
                        className="profile-image"
                      />
                    </div>
                  </div>
                  <div className="name-desc">
                    <div className="name">
                      {contact.firstName} {contact.lastName}
                    </div>
                    <div className="description">
                      {" "}
                      <b>Skills</b>:{" "}
                      {contact.skills.map((skill, index) => {
                        if (index === contact.skills.length - 1) {
                          return skill;
                        }
                        return skill + ", ";
                      })}
                    </div>
                  </div>
                </div>
                <div className="right-side">
                  <div className="icons">
                    <svg
                      className="chat-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() =>
                        openChat({
                          _id: contact._id,
                          firstName: contact.firstName,
                          lastName: contact.lastName,
                          profilePic: contact.profilePic,
                        })
                      }
                    >
                      <path
                        d="M44.0001 24C44.0001 35.0457 35.0458 44 24.0001 44C18.0266 44 4.00006 44 4.00006 44C4.00006 44 4.00006 29.0722 4.00006 24C4.00006 12.9543 12.9544 4 24.0001 4C35.0458 4 44.0001 12.9543 44.0001 24Z"
                        fill="#07484a"
                        stroke="#07484a"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14 18L32 18"
                        stroke="#FFF"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14 26H32"
                        stroke="#FFF"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14 34H24"
                        stroke="#FFF"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <svg
                      className="star-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => openRatingModal(contact)}
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#07484a"
                        d="M18.483 16.767A8.5 8.5 0 0 1 8.118 7.081a1.27 1.27 0 0 1-.113.097c-.28.213-.63.292-1.33.45l-.635.144c-2.46.557-3.69.835-3.983 1.776c-.292.94.546 1.921 2.223 3.882l.434.507c.476.557.715.836.822 1.18c.107.345.071.717-.001 1.46l-.066.677c-.253 2.617-.38 3.925.386 4.506c.766.582 1.918.052 4.22-1.009l.597-.274c.654-.302.981-.452 1.328-.452c.347 0 .674.15 1.329.452l.595.274c2.303 1.06 3.455 1.59 4.22 1.01c.767-.582.64-1.89.387-4.507z"
                      />
                      <path
                        fill="#07484a"
                        d="m9.153 5.408l-.328.588c-.36.646-.54.969-.82 1.182c.04-.03.077-.062.113-.097a8.5 8.5 0 0 0 10.366 9.686l-.02-.19c-.071-.743-.107-1.115 0-1.46c.107-.344.345-.623.822-1.18l.434-.507c1.677-1.96 2.515-2.941 2.222-3.882c-.292-.941-1.522-1.22-3.982-1.776l-.636-.144c-.699-.158-1.049-.237-1.33-.45c-.28-.213-.46-.536-.82-1.182l-.327-.588C13.58 3.136 12.947 2 12 2c-.947 0-1.58 1.136-2.847 3.408"
                        opacity="0.5"
                      />
                    </svg>
                    <FontAwesomeIcon
                      className="three-dots-icon"
                      icon={faEllipsisVertical}
                      size="2x"
                      onClick={() => toggleDropdown(contact._id)}
                    />
                    {dropdownOpen === contact._id && (
                      <div
                        className="dropdown-menu"
                        style={{
                          position: "absolute",
                          backgroundColor: "#fff",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                          zIndex: 100,
                        }}
                        ref={(el) => (dropdownRefs.current[contact._id] = el)}
                      >
                        <ul>
                          <li onClick={() => handleUnenroll(contact._id)}>
                            Unfollow
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {chatOpen && selectedRecipient && (
            <Chat
              user={user}
              recipient={selectedRecipient}
              closeChat={() => setChatOpen(false)}
            />
          )}
        </div>
        {isRatingModalOpen && (
          <RatingModal
            isOpen={isRatingModalOpen}
            onClose={closeRatingModal}
            onSubmit={submitRating}
            userToRate={userToRate}
          />
        )}
      </div>
    </>
  );
};

export default Connections;
