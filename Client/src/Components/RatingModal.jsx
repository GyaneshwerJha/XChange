import "../Styles/Connections.css";
import React, { useState } from "react";

// rating popup
const RatingModal = ({ isOpen, onClose, onSubmit, userToRate }) => {
    const [rating, setRating] = useState(0);
  
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>×</button>

          <h2>Ratings</h2>
          <p>How would you rate {userToRate}'s services to others?</p>
          <div>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${rating > index ? "filled" : ""}`}
                onClick={() => setRating(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
          <button onClick={() => onSubmit(rating)}>Submit</button>
        </div>
      </div>
    );
  };
  
  export default RatingModal