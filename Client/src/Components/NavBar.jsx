import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faArrowRight,
  faSignOut,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ user, updateUser }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.profilePic) {
      updateUser(user);
    }
  }, [user]);

  const handleLogout = () => {
    // Perform logout operations
    localStorage.removeItem("user");
    updateUser(null);
    navigate("/signin");
  };

  console.log(user);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="Images/xchange-logo-white.png" alt="logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink
              to="/explore"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Explore
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            About
          </NavLink>
        </li>
        {!user ? (
          <>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Sign Up
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink
                to="/signin"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Sign In
              </NavLink>
            </li>
          </>
        ) : (
          <></>
        )}{" "}
      </ul>
      <div className="navbar-actions">
        {searchVisible && (
          <input type="text" className="search-input" placeholder="Search..." />
        )}
        <button
          className="icon-button"
          onClick={() => setSearchVisible(!searchVisible)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <div
          className="profile-dropdown-container"
          onMouseEnter={() => setIsDropdownVisible(true)}
          onMouseLeave={() => setIsDropdownVisible(false)}
        >
          {/*<NavLink*/}
          {/*  className={({ isActive }) => (isActive ? "active-link" : "")}*/}
          {/*>*/}
          <button className="icon-button">
            {user && user.profilePic ? (
              <img
                src={`${
                  process.env.REACT_APP_API_URL
                }/${user.profilePic.replace(/\\/g, "/")}`}
                onError={(e) => {
                  e.target.onerror = null; // remove onError to prevent infinite callback loop
                  e.target.src = "Images/default-picture.png";
                }}
                alt="Profile"
                className="profile-image"
              />
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )}
          </button>
          {/*</NavLink>*/}
          {user && isDropdownVisible && (
            <div className="profile-dropdown-menu">
              <ul>
                <li className="nav-drop-down">
                  <div className="icon-circle">
                    <div className="nav-circle-icon" />
                    <FontAwesomeIcon className="nav-icons" icon={faUser} />
                  </div>
                  <NavLink to="/myprofile">
                    <p className="drop-label">Account Settings</p>
                  </NavLink>
                  <FontAwesomeIcon icon={faArrowRight} />
                </li>
                <li className="nav-drop-down">
                  <div className="icon-circle">
                    <div className="nav-circle-icon" />
                    <FontAwesomeIcon
                      className="middle-icon"
                      icon={faUserFriends}
                    />
                  </div>
                  <NavLink to="/connections">
                    <p className="drop-label">Connections</p>
                  </NavLink>
                  <FontAwesomeIcon icon={faArrowRight} />
                </li>
                <li className="nav-drop-down">
                  <div className="icon-circle">
                    <div className="nav-circle-icon" />
                    <FontAwesomeIcon className="nav-icons" icon={faSignOut} />
                  </div>
                  <NavLink to="/signin" onClick={handleLogout}>
                    <p className="drop-label">Logout</p>
                  </NavLink>
                  {/*<button onClick={handleLogout}><p className="drop-label">Logout</p></button>*/}
                  <FontAwesomeIcon icon={faArrowRight} />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
