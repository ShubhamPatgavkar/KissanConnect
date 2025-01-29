import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import "../styles/postCrop.css";
import backArrow from "../assets/back.png";

export default function PostCropForm() {
  const [formData, setFormData] = useState({
    cropName: "",
    quantity: "",
    quantityType: "",
    price: "",
    description: "",
    location: "",
    image: null,
    farmerName: "",  // Add farmerName to the formData state
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Get the logged-in user's name from localStorage
  const loggedInUser = localStorage.getItem('user');
  let farmerName = "";
  if (loggedInUser) {
    try {
      const parsedUser = JSON.parse(loggedInUser);
      farmerName = parsedUser.displayName || ""; // Get the farmer's name
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }

  // Update formData with the farmer's name
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add the farmer's name to the formData
    const formDataToSend = new FormData();
    formDataToSend.append('farmerName', farmerName);  // Add farmerName
    formDataToSend.append('cropName', formData.cropName);
    formDataToSend.append('quantity', formData.quantity);
    formDataToSend.append('quantityType', formData.quantityType);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('location', formData.location);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/api/crops/post', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      // Show SweetAlert on successful post
      swal({
        title: "Success!",
        text: "Your crop has been posted successfully.",
        icon: "success",
        button: "OK",
      });

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error posting crop details:', error.response.data);
      } else {
        console.error('Error posting crop details:', error.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="post-main-form">
      <div className="post-crop-form">
        <Link to="/" className="back-button">
          <img src={backArrow} alt="Back" />
        </Link>
        <h1 className="post-crop-form-title">Post Your Crop</h1>
        <form onSubmit={handleSubmit} className="post-crop-form-container">
          <div className="post-crop-form-group">
            <label htmlFor="cropName" className="post-crop-form-label">Crop Name</label>
            <input
              type="text"
              id="cropName"
              name="cropName"
              value={formData.cropName}
              onChange={handleInputChange}
              placeholder="Enter crop name"
              className="post-crop-form-input"
              required
            />
          </div>

          <div className="post-crop-form-group">
            <label htmlFor="quantity" className="post-crop-form-label">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity"
              className="post-crop-form-input"
              required
            />
          </div>

          <div className="post-crop-form-group">
            <label htmlFor="quantityType" className="post-crop-form-label">Quantity Type</label>
            <select
              id="quantityType"
              name="quantityType"
              value={formData.quantityType}
              onChange={handleInputChange}
              className="post-crop-form-select"
              required
            >
              <option value="">Select quantity type</option>
              <option value="kg">Kg</option>
              <option value="quintal">Quintal</option>
              <option value="ton">Ton</option>
            </select>
          </div>

          <div className="post-crop-form-group">
            <label htmlFor="price" className="post-crop-form-label">Price (per unit)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="post-crop-form-input"
              required
            />
          </div>

          <div className="post-crop-form-group">
            <label htmlFor="location" className="post-crop-form-label">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter your location"
              className="post-crop-form-input"
              required
            />
          </div>

          <div className="post-crop-form-group">
            <label htmlFor="description" className="post-crop-form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your crop"
              className="post-crop-form-textarea"
            />
          </div>

          <div className="post-crop-form-group">
            <label htmlFor="image" className="post-crop-form-label">Crop Image</label>
            <div className="post-crop-form-image-upload-container">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Crop preview"
                  className="post-crop-form-image-preview"
                />
              ) : (
                <div
                  className="post-crop-form-image-placeholder"
                  style={{
                    backgroundImage: `url('/path-to/image.png')`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                   Upload Image
                </div>
              )}
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="post-crop-form-input-file"
              />
            </div>
          </div>

          <button type="submit" className="post-crop-form-submit-button">
            Post Crop
          </button>
        </form>
      </div>
    </div>
  );
}
