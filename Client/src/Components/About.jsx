import React from "react";
import "../Styles/About.css";

// a static about us page for view only
const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About XChange</h1>
        <p>Your community-driven platform for skill exchange.</p>
      </section>

      <section className="about-description">
        <h2>What We Do</h2>
        <p>
          XChange facilitates skill exchanges between individuals, offering a
          convenient, affordable, and efficient way for learning new skills or
          enhancing existing ones. Our platform connects learners and experts in
          a collaborative community environment.
        </p>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          We strive to democratize education by making it accessible to
          everyone. By providing a space where knowledge can be exchanged
          freely, we empower individuals to grow and share their talents with
          the world.
        </p>
      </section>

      <section className="about-community">
        <h2>Our Community</h2>
        <p>
          The heart of XChange is a vibrant community of learners and teachers
          from all walks of life. Whether you're looking to improve your
          professional skills, pick up a new hobby, or teach others what you
          know, you'll find a welcoming space here.
        </p>
      </section>

      <section className="about-team">
        <h2>Meet the Team</h2>
        <p>
          Our dedicated team is made up of passionate professionals who believe
          in the power of sharing knowledge. With diverse backgrounds and a
          shared vision for a more skilled world, we're here to support your
          learning journey every step of the way.
        </p>
      </section>
    </div>
  );
};

export default About;
