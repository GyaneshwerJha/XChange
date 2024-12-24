import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../Styles/Explore.css";
import CreatePost from "./CreatePost";
import Chat from "./Chat";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import categories from "./Categories";

const Explore = ({ user, updateUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDescriptionIds, setExpandedDescriptionIds] = useState([]);

  const [userData2, setUserData2] = useState({});
  const openChat = (recipient) => {
    setSelectedRecipient(recipient);
    setChatOpen(true);
  };

  // to filter by category
  const toggleCategory = (category) => {
    console.log(category);
    const currentIndex = selectedCategories.indexOf(category);
    const newSelectedCategories = [...selectedCategories];
    if (currentIndex === -1) {
      newSelectedCategories.push(category);
    } else {
      newSelectedCategories.splice(currentIndex, 1);
    }
    setSelectedCategories(newSelectedCategories);
  };

  // display the filtered category
  const filteredPosts = posts.filter((post) => {
    const matchesTeach = selectedCategories.some((category) =>
      post.teach.includes(category)
    );
    const matchesLearn = selectedCategories.some((category) =>
      post.learn.includes(category)
    );
    return selectedCategories.length === 0 || matchesTeach || matchesLearn;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isUserEnrolled = (userId) => {
    console.log(user);
    console.log(user);
    return user.connections?.includes(userId);
  };

  const isUserPostOwner = (postUserId) => {
    return user._id === postUserId;
  };

  useEffect(() => {
    // Load the user data from local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserData2(JSON.parse(userData));
    }
  }, []);

  // if user does not input a banner, the background will randomly generate one of these colors
  const getRandomColor = () => {
    const colorArray = [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#809900",
      "#E6B3B3",
      "#6680B3",
      "#66991A",
      "#FF99E6",
      "#CCFF1A",
      "#FF1A66",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#66664D",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF",
    ];
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  };

  // when user creates a post, add it to the UI
  const onCreatePost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) return;
        // Fetch the user data, including connections
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/${userData2._id}`
        );
        const userData = response.data;
        const response1 = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/posts`
        );
        setPosts(
          response1.data.map((post) => ({
            ...post,
            bannerColor: post.banner
              ? `${process.env.REACT_APP_API_URL}/${post.banner}`
              : getRandomColor(),
          }))
        );

        updateUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userData2.connections, posts.length]);

  // load posts when user navigates to the explore page
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!user) return;

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/posts`
        );
        const fetchedPosts = response.data.map((post) => ({
          ...post,
          bannerColor: post.banner
            ? `${process.env.REACT_APP_API_URL}/${post.banner}`
            : getRandomColor(),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userData2._id]);

  // to follow users
  const handleEnroll = async (userId) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/${userData2._id}/connect`,
        { connectUserId: userId }
      );
      updateUser(data); // Update user state with the response data
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  // to unfollow users
  const handleUnenroll = async (userId) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/${user._id}/disconnect`,
        { connectUserId: userId }
      );

      updateUser(data); // Update user state with the response data
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };
  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };
  const gifVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1, duration: 1.5 } },
  };

  // extend description
  const toggleDescription = (postId) => {
    setExpandedDescriptionIds((currentIds) =>
      currentIds.includes(postId)
        ? currentIds.filter((id) => id !== postId)
        : [...currentIds, postId]
    );
  };

  // cut the description if it is long
  const getDescription = (post) => {
    const isExpanded = expandedDescriptionIds.includes(post._id);
    const truncatedDescription =
      post.description.length > 200
        ? `${post.description.substring(0, 200)}...`
        : post.description;

    return (
      <>
        <blockquote className={`description ${isExpanded ? "expanded" : ""}`}>
          {isExpanded ? post.description : truncatedDescription}
        </blockquote>
        {post.description.length > 200 && (
          <button
            className="read-more-button"
            onClick={() => toggleDescription(post._id)}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </>
    );
  };

  return (
    <div style={{ paddingBottom: "40px" }}>
      <div className="top-section-explore">
        <motion.div
          className="hero"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 className="pageTitle" variants={childVariants}>
            <div>
              Variety of users <br /> looking to connect!
            </div>
          </motion.h1>
          <motion.p className={"pageSubtitle"} variants={childVariants}>
            Explore different skills. Find the best services that <br /> suit
            your needs.
          </motion.p>
        </motion.div>
        <motion.img
          src="Images/education.gif"
          alt="Education GIF"
          className="education-image"
          variants={gifVariants}
          initial="hidden"
          animate="visible"
        />
      </div>
      <h1 className="title-page-explore">Explore</h1>
      <div className="explore-container">
        <div className="explore-sidebar">
          <div id="explore-search" className="search-box">
            <FontAwesomeIcon className="search-icon-explore" icon={faSearch} />
            <input
              className="search"
              type="search"
              placeholder="Search Categories"
              onChange={handleSearchChange}
              value={searchTerm}
            />{" "}
          </div>
          <ul className="category-list">
            {filteredCategories.map((category, index) => (
              <li
                key={index}
                onClick={() => toggleCategory(category)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(-1)}
                style={{
                  backgroundColor: selectedCategories.includes(category)
                    ? "rgba(11, 91, 67, 0.6 )"
                    : hoverIndex === index
                    ? "#ccc"
                    : "transparent",
                }}
              >
                {category}
              </li>
            ))}
          </ul>
          {/*<button>All Categories</button>*/}
        </div>
        <div className="main-content">
          <div className="explore-header">
            <button onClick={handleOpenModal}>
              <img src="Images/createPost.svg" alt="" />
              <div>Create Post</div>
            </button>
          </div>
          <div className="user-profiles">
            {filteredPosts.map((post, index) => (
              <div key={index} className="profile-card">
                <div
                  className="post-profile-banner"
                  style={{ backgroundColor: post.bannerColor }}
                >
                  {post.banner && <img src={post.bannerColor} alt="Banner" />}
                  <div className="availabilities">
                    <div className="avail-img">
                      <img src="Images/clock.svg" alt="" />
                    </div>
                    <div>
                      {post.availabilities.length > 0 && (
                        <div className="availability-entry">
                          <span>
                            {post.availabilities[0].day.substring(0, 3)} :{" "}
                            {post.availabilities[0].fromTime} -{" "}
                            {post.availabilities[0].toTime}
                          </span>
                        </div>
                      )}
                      {post.availabilities
                        .slice(1)
                        .map((availability, index) => (
                          <div key={index} className="availability-entry">
                            <span>
                              {availability.day.substring(0, 3)} :{" "}
                              {availability.fromTime} - {availability.toTime}
                              <br />
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <div className="profile-picture-name">
                    <div className="profile-details">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${
                          post.profilePic
                            ? post.profilePic.replace(/\\/g, "/")
                            : ""
                        }`}
                        onError={(e) => {
                          if (!e.target.src.endsWith("default-picture.png")) {
                            e.target.src = "Images/default-picture.png";
                          }
                        }}
                        alt="Profile"
                        className="profile-image"
                      />
                      <div className="name-skills-lf">
                        {" "}
                        <div className="name-rating">
                          <h3>
                            {post.firstName} {post.lastName}
                          </h3>
                          <div className="rating">
                            {post.averageRating === 0
                              ? "No Rating"
                              : post.averageRating}
                            <img src="Images/star.svg" alt="" />
                          </div>
                        </div>
                        <p>
                          <b>Skill Offers</b>: {post.teach}
                        </p>
                        <p>
                          <b>Looking for</b>: {post.learn}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="icons">
                      {!isUserPostOwner(post.userId) ? (
                        isUserEnrolled(post.userId) ? (
                          // Display "Unfollow" and "Message" buttons if user is enrolled
                          <>
                            <img
                              src="Images/unfollow.svg"
                              onClick={() => handleUnenroll(post.userId)}
                            />
                            <img
                              className="msg"
                              src="Images/message.svg"
                              onClick={() =>
                                openChat({
                                  _id: post.userId,
                                  firstName: post.firstName,
                                  lastName: post.lastName,
                                  profilePic: post.profilePic,
                                })
                              }
                            />
                          </>
                        ) : (
                          // Display "Follow" button if user is not enrolled
                          <img
                            src="Images/follow.svg"
                            onClick={() => handleEnroll(post.userId)}
                          />
                        )
                      ) : null}
                    </div>
                  </div>
                  <div className="user-info">
                    <div className="user-info-desc">{getDescription(post)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {chatOpen && selectedRecipient && (
          <Chat
            user={user}
            recipient={selectedRecipient}
            closeChat={() => setChatOpen(false)}
          />
        )}
        <CreatePost
          open={modalOpen}
          handleClose={handleCloseModal}
          user={user}
          onCreatePost={onCreatePost}
        />
      </div>
    </div>
  );
};

export default Explore;
