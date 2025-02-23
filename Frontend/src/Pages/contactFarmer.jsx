import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/contactFarmer.css";

const ContactFarmer = () => {
  const { cropId } = useParams();
  const [farmerEmail, setFarmerEmail] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contactDetails, setContactDetails] = useState({
    cropQuantity: "",
    deliveryDate: "",
    deliveryAddress: "",
    additionalNotes: "",
  });

  // ✅ Fetch Farmer Email When Component Mounts
  useEffect(() => {
    const fetchFarmerEmail = async () => {
      try {
        console.log("Fetching farmer email for crop:", cropId);
        const response = await fetch(`http://localhost:5000/api/crops/${cropId}`);
        const data = await response.json();

        console.log("API Response:", data); 

        if (response.ok && data.farmerEmail) {
          setFarmerEmail(data.farmerEmail);
        } else {
          setError("Failed to fetch farmer's email.");
        }
      } catch (err) {
        setError("Network error. Unable to fetch farmer's email.");
      }
    };

    if (cropId) fetchFarmerEmail();
  }, [cropId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // ✅ Get logged-in user's email from localStorage
    const loggedInUser = localStorage.getItem("user");
    let userEmail = "";

    if (loggedInUser) {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        userEmail = parsedUser?.email || "";
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    if (!farmerEmail || !userEmail) {
      setError("Missing user or farmer email.");
      setIsLoading(false);
      return;
    }

    const payload = {
      farmerEmail,
      userEmail, 
      contactDetails,
    };

    try {
      // ✅ Send request with JWT token for authentication (Instead of password)
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/email/sendEmail", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ Use JWT token instead of password
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Request sent successfully!");
        setShowForm(false);
      } else {
        setError(data.error || "Failed to send request.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-farmer-container">
      <div className="contact-farmer-box">
        <h2 className="header">Contact Farmer</h2>
        <p className="sub-header">Request crop from the farmer</p>
        {farmerEmail && <p className="farmer-email">Farmer Email: {farmerEmail}</p>}

        <div className="contact-farmer-content">
          {error && <div className="error-message">{error}</div>}
          
          {showForm ? (
            <form onSubmit={handleSubmit} className="contact-form">
              <input
                type="number"
                placeholder="Crop Quantity (kg)"
                value={contactDetails.cropQuantity}
                onChange={(e) => setContactDetails({ ...contactDetails, cropQuantity: e.target.value })}
                required
              />
              <input
                type="date"
                value={contactDetails.deliveryDate}
                onChange={(e) => setContactDetails({ ...contactDetails, deliveryDate: e.target.value })}
                required
              />
              <textarea
                placeholder="Delivery Address"
                value={contactDetails.deliveryAddress}
                onChange={(e) => setContactDetails({ ...contactDetails, deliveryAddress: e.target.value })}
                required
              />
              <textarea
                placeholder="Additional Notes"
                value={contactDetails.additionalNotes}
                onChange={(e) => setContactDetails({ ...contactDetails, additionalNotes: e.target.value })}
              />
              <button type="submit" className="submit-btn" disabled={isLoading || !farmerEmail}>
                {isLoading ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          ) : (
            <div className="preview-container">
              <h3>Request Summary</h3>
              <p><strong>Crop Quantity:</strong> {contactDetails.cropQuantity} kg</p>
              <p><strong>Delivery Date:</strong> {contactDetails.deliveryDate}</p>
              <p><strong>Delivery Address:</strong> {contactDetails.deliveryAddress}</p>
              {contactDetails.additionalNotes && <p><strong>Additional Notes:</strong> {contactDetails.additionalNotes}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactFarmer;
