import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Styles/UserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const selectedButton = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log("Retrieved userData:", userData);
      setUser(userData); // Set user state with data retrieved from local storage

      // Proceed to fetch fresh data if the user ID is available
      if (userData._id) {
        fetchUserData(userData._id);
      } else {
        console.error("User ID is not available in userData.");
      }
    } else {
      console.error("User data not found in local storage.");
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/${userId}`
      );
      setUser(response.data);
      console.log(
        `${process.env.REACT_APP_API_URL}/uploads/${user.profilePic.replace(
          /\\/g,
          "/"
        )}`
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  // clicking on different sections
  const HandleOnClickLeft = (event) => {
    selectedButton.current.className = "unselected";
    const firstChild = selectedButton.current.querySelector("div");
    firstChild.className = "unselected";
    selectedButton.current = event.target;
    selectedButton.current.className = "selected-li";
    const newChild = selectedButton.current.querySelector("div");
    newChild.className = "selected-bar";
    HandleOnClickRight(event);
  };

  const HandleOnClickRight = (event) => {
    const selected = document.getElementsByClassName("selected-option")[0];
    selected.className = "unselected-option";
    const text = event.target.innerText;
    const el = document.getElementById(text);
    el.className = "selected-option";
  };

  return (
    <div className="settings-container">
      {/*Left side*/}
      <div className="full-container">
        <div className="sidebar">
          <h2>Settings</h2>
          <ul>
            <li
              className="selected-li"
              ref={selectedButton}
              onClick={HandleOnClickLeft}
            >
              <div className="selected-bar" />
              Account
            </li>
            <li className="unselected" onClick={HandleOnClickLeft}>
              <div className="unselected" />
              Password
            </li>
            <li className="unselected" onClick={HandleOnClickLeft}>
              <div className="unselected" />
              Privacy
            </li>
            <li className="unselected" onClick={HandleOnClickLeft}>
              <div className="unselected" />
              Help
            </li>
          </ul>
        </div>
        {/*Right Side*/}
        <div id="Account" className="selected-option">
          <h2>Account Information</h2>
          <div className="profile-picture-section">
            <h3 className="subtitle-h3">Profile Picture</h3>
            <div className="top-part">
              <div className="Above-img">
                <FontAwesomeIcon className="pen-icon-pfp" icon={faPen} />
              </div>
              <img
                src={`${
                  process.env.REACT_APP_API_URL
                }/${user.profilePic.replace(/\\/g, "/")}`}
                onError={(e) => {
                  if (!e.target.src.endsWith("default-picture.png")) {
                    // Prevents infinite loop
                    e.target.src = "Images/default-picture.png";
                  }
                }}
                alt="Profile"
              />
              <div className="person-info">
                <p className="full-name">
                  {user.firstName} {user.lastName}
                </p>
                <p className="skills">
                  <b>Skills</b>:{" "}
                  {user.skills.map((skill, index) => {
                    if (index === user.skills.length - 1) {
                      return skill;
                    }
                    return skill + ", ";
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="basic-info">
            <h3>Basic Information</h3>
            <div className="name-f-l">
              <div className="div-name">
                <p>First Name</p>
                <input type="text" value={user.firstName} />
              </div>
              <div className="div-name">
                <p>Last Name</p>
                <input type="text" value={user.lastName} />
              </div>
            </div>
            <div className="email-pass">
              <p>Email Address</p>
              <input type="email" value={user.email} />
            </div>
            <div className="email-pass">
              <p>Password</p>
              <input
                className="input-pass"
                type="password"
                value={user.password}
                readOnly
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "45px",
              paddingBottom: "30px",
            }}
          >
            <button className="confirm-button" disabled={true}>
              Confirm
            </button>
          </div>
        </div>
        <div id="Password" className="unselected-option">
          <h2>Password</h2>
          <div style={{ marginTop: "40px" }}>
            <h3 className="subtitle-h3">Change Password</h3>
            <p className="pass-desc">
              In case you require a password modification, you may do so by
              typing the new password below and pressing <b>Confirm</b>.
            </p>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "space-between",
                boxSizing: "border-box",
                padding: "0 0px",
              }}
            >
              <div className="old-pass">
                <p className="pass-labels">Old Password</p>
                <input
                  className="pass-inputs"
                  type="password"
                  value={user.password}
                  readOnly
                />
              </div>
              <div className="new-pass">
                <p className="pass-labels">New Password</p>
                <input className="pass-inputs" type="password" />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "45px",
              }}
            >
              <button className="confirm-button" disabled={true}>
                Confirm
              </button>
            </div>
          </div>
        </div>
        <div id="Privacy" className="unselected-option">
          <h2>Privacy</h2>
          <div style={{ marginTop: "40px" }}>
            <h3 className="subtitle-h3">Discoverability</h3>
            <p className="pass-desc">
              Allow other users on <b> XChange</b> to find me by my full name in
              the <b> Explore</b> page.
            </p>
            <div
              className="check-disc"
              style={{ borderBottom: "1px solid rgba(7, 72, 74, 0.4)" }}
            >
              <div className="check-box">
                <div className="check-circle">x</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "40px" }}>
            <h3 className="subtitle-h3">Cookie Notifications</h3>
            <p className="pass-desc">
              Allow cookie notification to help us analyze our website traffic
              and performance. We never collect any personal data.
            </p>
            <div className="check-disc">
              <div className="check-box">
                <div className="check-circle">x</div>
              </div>
            </div>
          </div>
        </div>
        <div id="Help" className="unselected-option">
          <h2>Help</h2>
          <p style={{ fontWeight: "300", letterSpacing: "0.5px" }}>
            If you are looking for assistance with your account, please refer
            back to the About section. You will be able to find the necessary
            contact information to receive further assistance.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
