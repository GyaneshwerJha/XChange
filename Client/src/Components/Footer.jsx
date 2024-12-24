import React from "react";
import "../Styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="top-footer">
                <div>
                    <img src="Images/xchange-logo-white.png" alt=""/>
                    <div className="social-icons">
                        <FontAwesomeIcon icon={faFacebook}/>
                        <FontAwesomeIcon icon={faInstagram}/>
                        <FontAwesomeIcon icon={faLinkedin}/>
                        <FontAwesomeIcon icon={faTwitter}/>
                    </div>
                </div>
                    <div className="links">
                        <h2>My Account</h2>
                        <NavLink
                            to="/signin"
                        >
                            Sign In
                        </NavLink>
                        <NavLink
                            to="/signup"
                        >
                            Sign Up
                        </NavLink>
                    </div>
                <div className="links">
                    <h2>Help</h2>
                    <NavLink
                        to="/about"
                    >
                        About
                    </NavLink>
                    
                </div>
                <div className="links">
                    <h2>General</h2>
                    <NavLink
                        to="/"
                    >
                        Homepage
                    </NavLink>
                    <NavLink
                        to="/explore"
                    >
                        Explore
                    </NavLink>
                </div>
                <div className="links">
                    <h2>Legal Stuff</h2>
                    <p>Terms & Conditions</p>
                    <p>Privacy & Policy</p>
                </div>
            </div>
            <div className="bottom-footer">
                Copyright ©2024 <b>XChange</b>. All Rights Reserved
            </div>
        </div>
    );
}

export default Footer;
