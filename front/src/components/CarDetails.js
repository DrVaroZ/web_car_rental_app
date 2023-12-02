import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/car_details_page.css';

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const { id } = useParams(); // Use the useParams hook to get the id from the URL

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error.message);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div className="car-details-container">
      <h2>Car Details</h2>
      <div className="car_details-item">
      <img src={car.image} alt={car.brand} />
      <p>Brand: {car.brand}</p>
      <p>Model: {car.model}</p>
      <p>Year: {car.year}</p>
      </div>
      {/* Add more details as needed */}
    </div>
  );
};

export default CarDetails;
