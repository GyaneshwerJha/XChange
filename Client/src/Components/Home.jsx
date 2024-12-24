import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import {
  faUsers,
  faLightbulb,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Styles/Home.css";
import { NavLink } from "react-router-dom";

const Home = ({ user }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
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

  const features = [
    {
      icon: faUsers,
      title: "Connect and Share",
      description:
        "Connect with peers and exchange knowledge on a variety of subjects.",
    },
    {
      icon: faLightbulb,
      title: "Learn New Skills",
      description:
        "Expand your horizons by learning new skills from experienced individuals.",
    },
    {
      icon: faChalkboardTeacher,
      title: "Teach Others",
      description:
        "Give back to the community by teaching others what you know.",
    },
  ];

  const testimonials = [
    {
      name: "Jane Doe",
      text: "XChange has revolutionized the way I learn new skills. It's incredibly user-friendly and effective!",
    },
    {
      name: "John Smith",
      text: "This platform has connected me with so many experts in my field. Learning has never been so fun and easy.",
    },
    {
      name: "Alice Johnson",
      text: "As someone who loves teaching, XChange provided me the perfect audience to share my knowledge.",
    },
  ];

  const gifVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1, duration: 1.5 } },
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="homepage">
      <div className="top-section">
        <motion.div
          className="hero"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 className="pageTitle" variants={childVariants}>
            <div>Welcome to</div>
            <div className="logo">&nbsp;XChange</div>
          </motion.h1>
          <motion.p className={"pageSubtitle"} variants={childVariants}>
            Your hub for skill sharing and personal growth.
          </motion.p>
          {user ? (
            <div className="button">
              {/*<input className="exploreButton" type={"button"} value={"Explore Now"} onClick={handleFormSubmit}/>*/}
              <NavLink to="/explore" className="nav-link">
                Explore Now
              </NavLink>
            </div>
          ) : (
            <motion.p className={"pageSubtitle"} variants={childVariants}>
              Register to Explore now!
            </motion.p>
          )}
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

      <motion.div
        className="features"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-item"
            variants={childVariants}
          >
            <div className="feature-icon">
              <FontAwesomeIcon icon={feature.icon} size="3x" />
            </div>
            <h3>{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
      {/*Benefits*/}
      <div className="benefits-home">
        <h2>Benefits for your expediency</h2>
        <div className="benefits-bottom">
          <div className="boxes">
            <div
              className="benefits-box"
              style={{ backgroundColor: "#eeebff" }}
            >
              <img src="Images/service-icon.svg" alt="" />
            </div>
            <h3>Free Services</h3>
            <p>Everything is free of charge!</p>
          </div>
          <div className="boxes">
            <div
              className="benefits-box"
              style={{ backgroundColor: "#fff4e7" }}
            >
              <img
                src="Images/ratingIcon.svg"
                alt=""
                style={{
                  border: "2px solid #70908b",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                }}
              />
            </div>
            <h3>Rating Policy</h3>
            <p>
              Give feedback on your services <br /> by rating them.
            </p>
          </div>
          <div className="boxes">
            <div
              className="benefits-box"
              style={{ backgroundColor: "#caf3e5" }}
            >
              <img src="Images/dbIcon.svg" alt="" />
            </div>
            <h3>Messaging System</h3>
            <p>
              Flexible messaging system <br />
              between connections.
            </p>
          </div>
        </div>
      </div>
      <div className="testimonial-section">
        <h2 className="section-title">Testimonials</h2>
        <Slider {...settings} className="testimonials-slider">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              whileHover={{ scale: 1.05 }}
            >
              <blockquote>"{testimonial.text}"</blockquote>
              <p className="testimonial-author">- {testimonial.name}</p>
            </motion.div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
