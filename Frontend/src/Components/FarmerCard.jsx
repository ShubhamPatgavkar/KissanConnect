import React, { useState, useEffect } from 'react';
import '../styles/FarmerCard.css';

const FarmerCard = ({ cropName, location, price, image,farmerName }) => {


  // Fetch farmer's name from localStorage

  return (
    <div className="farmer-card">
      <h2 className="crop-name">{cropName}</h2>
      <div className="image-placeholder">
        {/* Display image if available, else show placeholder */}
        {image ? (
          <img src={image} alt={cropName} className="crop-image" />
        ) : (
          <span className="no-image">No Image Available</span>
        )}
      </div>
      <div className="card-details">
        <p><strong>Farmer:</strong> {farmerName}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Price:</strong> ₹{price} per quintal</p>
      </div>
      <button className="contact-button">Contact Farmer</button>
    </div>
  );
};

export default FarmerCard;
