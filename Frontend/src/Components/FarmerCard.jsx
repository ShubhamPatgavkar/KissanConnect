import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FarmerCard.css';

const FarmerCard = ({ cropId, cropName, location, price, image, farmerName }) => {
  return (
    <div className="farmer-card">
      <h2 className="crop-name">{cropName}</h2>
      <div className="image-placeholder">
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
      
      {/* ✅ Pass cropId in URL */}
      <Link to={`/contactFarmer/${cropId}`}>
        <button className="contact-button">Contact Farmer</button>
      </Link>
    </div>
  );
};

export default FarmerCard;
