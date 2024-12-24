import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import axios from "axios";
import { containerClasses } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// sign up component
const Signup = ({ updateUser }) => {
  const navigate = useNavigate();
  // state variables to hold user inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeCheck, setAgreeCheck] = useState(false);
  const [aboveEighteen, setAboveEighteen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [isActive, setIsActive] = useState(false);

  const ActivatePage = () => {
    setIsActive(!isActive);
  };

  // submit new user to backend to be saved in the database
  const handleSignup = (event) => {
    event.preventDefault();

    const skills = [skill1, skill2, skill3].filter((skill) => skill !== ""); // Filter out empty strings
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    skills.forEach((skill, index) =>
      formData.append(`skills[${index}]`, skill)
    );
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    const response = axios
      .post(`${process.env.REACT_APP_API_URL}/api/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        updateUser(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <div className="login-banner">
          {/* Left Side */}
          <div className="brand-logo">
            <img src="Images/xchange-logo-white.png" alt="Logo" />
          </div>
          <div className="banner-text">
            <h2>Already Have an Account?</h2>
            <div className="subtitle">
              Stay connected by signing in right now!
            </div>
            <button onClick={() => navigate("/signin")}>Sign In</button>
          </div>
        </div>
        <div className="login-form-container">
          {/* Right Side */}
          {!isActive && (
            <form onSubmit={handleSignup} className="login-form">
              <h1>Create your Account</h1>
              <div className="form-field">
                <div className="form-field">
                  <label htmlFor="profilePic">Profile Picture</label>
                  <label htmlFor="profilePic" className="custom-file-upload">
                    Choose File
                  </label>
                  <input
                    type="file"
                    id="profilePic"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                  />
                  {profilePic && <span>{profilePic.name}</span>}{" "}
                  {/* Optional: display selected file name */}
                </div>

                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>{" "}
              <div className="form-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="next-button" onClick={ActivatePage}>
                Next
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </form>
          )}
          {isActive && (
            <form onSubmit={handleSignup} className="login-form">
              <h1>Create your Account</h1>
              <div className="form-field">
                <h4 className="skills-h4">Enter a few skills below.</h4>

                <label htmlFor="skill1">Skill 1:</label>
                <input
                  type="text"
                  id="skill1"
                  value={skill1}
                  onChange={(e) => setSkill1(e.target.value)}
                />
              </div>{" "}
              <div className="form-field">
                <label htmlFor="skill2">Skill 2:</label>
                <input
                  type="text"
                  id="skill2"
                  value={skill2}
                  onChange={(e) => setSkill2(e.target.value)}
                />
              </div>
              <div className="form-field" style={{ marginBottom: "20px" }}>
                <label htmlFor="skill3">Skill 3:</label>
                <input
                  type="text"
                  id="skill3"
                  value={skill3}
                  onChange={(e) => setSkill3(e.target.value)}
                />
              </div>
              <div className="form-remember">
                <input
                  type="checkbox"
                  id="agreeCheck"
                  checked={agreeCheck}
                  onChange={(e) => setAgreeCheck(e.target.checked)}
                />
                <label htmlFor="agreeCheck" style={{ fontSize: "13px" }}>
                  I agree and acknowledge the Terms and Conditions.
                </label>
              </div>
              <div className="form-remember">
                <input
                  type="checkbox"
                  id="aboveEighteen"
                  checked={aboveEighteen}
                  onChange={(e) => setAboveEighteen(e.target.checked)}
                />
                <label htmlFor="aboveEighteen" style={{ fontSize: "13px" }}>
                  I am above the legal age (18+).
                </label>
              </div>
              <div className="signup-buttons" style={{ marginTop: "20px" }}>
                <button className="previous-button" onClick={ActivatePage}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Previous
                </button>
                <button type="submit">Sign up</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
