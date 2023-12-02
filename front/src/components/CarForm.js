import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

const CarForm = ({ loggedInUser, updateCars }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Navigate back to the car-list page
    navigate('/car-list');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      // Отправляем запрос на создание нового автомобиля
      const response = await axios.post('http://localhost:5000/api/cars', {
         brand,
         model, 
         year,
         image, 
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
    },
  } );
      console.log('Car created:', response.data);

      // Обновляем список автомобилей после создания нового
      updateCars();
      
      // Очищаем поля формы после успешного создания
      setBrand('');
      setModel('');
      setYear('');
      setImage('');
    } catch (error) {
      console.error('Error creating car:', error.message);
    }
  };

  if (!loggedInUser) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
      <label>
        Brand:
        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
      </label>
      <label>
        Model:
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
      </label>
      <label>
        Year:
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
      </label>
      <label>
        Image:
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </label>
      <button type="submit">Create Car</button>
    </form>
    <button onClick={handleGoBack}>Go Back to Car List</button>
    </div>
  );
};

export default CarForm;
