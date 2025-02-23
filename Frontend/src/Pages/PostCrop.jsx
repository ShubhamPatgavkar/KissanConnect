import React, { useState } from "react";
import { ArrowLeft, Upload, Leaf } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "../styles/postCrop.css";

export default function PostCropForm() {
  const [formData, setFormData] = useState({
    cropName: "",
    quantity: "",
    quantityType: "",
    price: "",
    description: "",
    location: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Retrieve farmer details from localStorage
  const loggedInUser = localStorage.getItem("user");
  let farmerName = "";
  let farmerEmail = "";

  if (loggedInUser) {
    try {
      const parsedUser = JSON.parse(loggedInUser);
      farmerName = parsedUser.displayName || "";
      farmerEmail = parsedUser.email || "";
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("farmerName", farmerName);
    formDataToSend.append("farmerEmail", farmerEmail);
    formDataToSend.append("cropName", formData.cropName);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("quantityType", formData.quantityType);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await axios.post("http://localhost:5000/api/crops/post", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      swal("Success!", "Your crop has been posted successfully.", "success");
    } catch (error) {
      console.error("Error posting crop details:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="post-crop-form">
        {/* Header */}
        <div className="form-header">
          <Link to="/" className="back-button">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div className="header-content">
            <Leaf className="w-8 h-8 text-white" />
            <h1 className="form-title">Post Your Crop</h1>
          </div>
        </div>

        {/* Form */}
       <form onSubmit={handleSubmit} className="form-content">
  <div className="input-group">
    <div className="input-half">
      <label>Crop Name</label>
      <input
        type="text"
        name="cropName"
        value={formData.cropName}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        required
      />
    </div>

    <div className="input-half">
      <label>Location</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        required
      />
    </div>
  </div>

  <div className="input-group">
    <div className="input-half">
      <label>Quantity</label>
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        required
      />
    </div>

    <div className="input-half">
      <label>Quantity Type</label>
      <select
        name="quantityType"
        value={formData.quantityType}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        required
      >
        <option value="">Select type</option>
        <option value="kg">Kg</option>
        <option value="quintal">Quintal</option>
        <option value="ton">Ton</option>
      </select>
    </div>
  </div>

  <div>
    <label>Price (₹ per unit)</label>
    <input
      type="number"
      name="price"
      value={formData.price}
      onChange={handleInputChange}
      className="price-input px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      required
    />
  </div>

  <label>Description</label>
  <textarea
    name="description"
    value={formData.description}
    onChange={handleInputChange}
    rows={4}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
  />

  {/* Image Upload */}
  <label>Crop Image</label>
  <div className="image-upload-container">
    {imagePreview ? (
      <img src={imagePreview} alt="Preview" className="image-preview" />
    ) : (
      <Upload className="upload-icon" />
    )}
    <input
      type="file"
      name="image"
      onChange={handleImageUpload}
      accept="image/*"
    />
  </div>

  {/* Submit Button */}
  <button type="submit" className="submit-button">
    Post Crop
  </button>
</form>

      </div>
    </div>
  );
}
