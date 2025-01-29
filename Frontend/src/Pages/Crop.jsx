import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FarmerCard from '../Components/FarmerCard';
import '../styles/Crop.css';
function Crop() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/crops');
        setCrops(response.data);
        console.log('Crops:', response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crops:', error);
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  return (
    <div className="crop-container">
      <h1 className="title">Available Crops</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="crop-grid">
          {crops.map((crop) => (
            <FarmerCard
              key={crop._id}
              cropName={crop.cropName}
              farmerName={crop.farmerName}
              location={crop.location}
              price={crop.price}
              image={crop.image ? `http://localhost:5000/uploads/${crop.image}` : null} // Passing image URL if available
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Crop;
