import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import { containerClasses } from "@mui/material";

// login component to render the UI
const Login = ({ updateUser }) => {
  const navigate = useNavigate();
  // state vairables to hold input fields
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // handling API call for login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        { email, password }
      );
      updateUser(response.data); // update user's session
      navigate("/"); // go to home page upon successful login
    } catch (error) {
      console.error("There was an error!", error);
    }
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
            <h2>Don't have an account?</h2>
            <h5>Join us and start your journey today!</h5>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
        </div>
        <div className="login-form-container">
          {/* Right Side */}
          <form onSubmit={handleLogin} className="login-form">
            <h1>Sign in</h1>
            <div className="form-field">
              <label className="labels" htmlFor="email">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="labels" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-remember">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <button type="submit">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
