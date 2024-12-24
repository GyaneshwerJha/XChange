# XChange

## Description
XChange is a web application designed to address the difficulty people face in finding affordable and convenient ways to learn new skills or improve existing ones. It provides users with a platform where they can easily connect with others willing to teach and learn a wide range of skills, fostering a community of mutual learning and skill development.

## Technologies Used

<p align="center">
  <a aria-label="Javascript" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
    <img alt="" src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  </a>
      <a aria-label="VSCode" href="https://code.visualstudio.com/">
    <img alt="" src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">
    </a>
          <a aria-label="Rider" href="https://https://www.jetbrains.com/rider//">
    <img alt="" src="https://img.shields.io/badge/Rider-000000.svg?style=for-the-badge&logo=Rider&logoColor=white&color=black&labelColor=crimson">
    </a>
    <a aria-label="Figma" href="https://www.figma.com">
    <img alt="" src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  </a>
<a aria-label="REST API" href="https://en.wikipedia.org/wiki/REST">
    <img alt="" src="https://img.shields.io/badge/REST%20API-4d4d4d?style=for-the-badge">
  </a>
  <a aria-label="React" href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  </a>
    <a aria-label="MongoDB" href="https://www.mongodb.com">
    <img alt="" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
  </a>
  <a aria-label="ExpressJS" href="https://expressjs.com/">
    <img alt="" src="https://img.shields.io/badge/ExpressJS-17202C?style=for-the-badge&logo=express&logoColor=white">
  </a>
</p>

## Table of Contents
- [Installation](#installation)
- [Demo](#demo)
- [Features](#features)

## Installation
To run this application locally, follow these steps:

1. **Clone this repository to your local machine.**
    ```sh
    git clone https://github.com/Ahmad-Elmahallawy/XChange.git
    ```

2. **Navigate to the project directory.**
    ```sh
    cd XChange
    ```

3. **Open it with your favourite IDE (VS Code Preferred).**
    
4. **Create a file called `.env` inside `Client` folder (if the file does not already exist) and enter the following command**
    ```javascript
    REACT_APP_API_URL=http://localhost:8000
    ```

5. **Create a new Terminal**

6. **Navigate to `Client` Folder using the newly created Terminal.**
    ```sh
    cd Client
    ```

7. **Install dependencies through the terminal.**
    ```sh
    npm install
    ```

8. **Start the Client side**
    ```sh
    npm start
    ```

9. **For setting up the database, you have two options:**

   - a. **Using MongoDB Atlas:**
       - Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
       - Create a new cluster and configure it as per your requirements.
       - Obtain the connection URI from MongoDB Atlas and replace it with the `DB_URI` value in the `.env` file that you will create if it does not exist inside the `Server` folder.

   - b. **Using MongoDB Compass:**
       - Download and install [MongoDB Compass](https://www.mongodb.com/try/download/compass).
       - Connect MongoDB Compass to your local MongoDB instance or create a new connection to your MongoDB Atlas cluster.
       - Copy the connection string and replace it with the `DB_URI` value in the `.env` file that you will create if it does not exist inside the `Server` folder .
    
   - `DB_URI` example in `.env` file of the `Server` folder:
     ```javascript
     DB_URI={YOUR_CONNECTION_STRING}
     ```

10. **Create a new Terminal (NOTE: keep the first one running for successful execution of the app)**

11. **Navigate to `Server` Folder using the newly created Terminal.**
    ```sh
    cd Server
    ```

12. **Install dependencies through the terminal.**
    ```sh
    npm install
    ```

13. **Start the Server**
    ```sh
    npm run dev
    ```

14. **Open your web browser and navigate to `http://localhost:3000` to view the app.**



## Demo
https://github.com/Ahmad-Elmahallawy/XChange/assets/84809147/86d5053c-8c63-404b-ac98-22315d5dcf2e


## Features

- **User Registration and Profile Creation:**
  - Users can easily create accounts and build profiles detailing the skills they possess and wish to learn, helping them connect with the right community members.

- **Skill Matching Filters:**
  - The platform allows users to filter based on their skill preferences, making it easy to find relevant posts about what they are looking to learn or teach.

- **Comprehensive Messaging System:**
  - Real-time communication is facilitated through a messaging system, enabling users to discuss posts, coordinate learning sessions, and build connections.

- **Rating and Review System:**
  - Users can provide feedback on their learning experiences with specific instructors or learners, contributing to the community's trust and credibility.

- **Flexible Learning Pathways:**
  - XChange offers users the flexibility to personalize their educational experiences, allowing for diverse learning styles and paces.

- **Cost-effective Solution:**
  - The platform provides a cost-effective alternative to traditional education methods, making learning more accessible to individuals from all economic backgrounds.

- **Supportive Learning Community:**
  - XChange fosters a supportive environment where individuals can engage in mutual learning and skill development, promoting continuous growth and collaboration.

- **Interactive and User-friendly Interface:**
  - The application features a user-friendly and interactive interface with straightforward navigation, simplifying access to key features and resources.

- **Inclusive Access to Education:**
  - XChange promotes inclusivity and equal access to education by removing financial barriers and providing a centralized hub for skill exchanges.

- **Usability and Efficiency:**
  - The platform prioritizes usability and efficiency, offering features like personalized search filters and automated messaging systems to enhance productivity and streamline the learning journey.

- **Post Creation for Learning Needs:**
  - Users can create detailed posts specifying what they wish to learn or teach, including their availability for these sessions, making it easier to schedule and plan educational engagements.

- **Visibility of Availabilities in Posts:**
  - Each post clearly displays the availability of the poster, allowing others to quickly ascertain potential matching times for learning sessions, which aids in efficient scheduling and maximizes engagement opportunities.


