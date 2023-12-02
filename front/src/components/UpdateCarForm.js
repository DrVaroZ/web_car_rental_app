// UpdateCarForm.js (React component for updating a car)
import React, { useState } from 'react';

const UpdateCarForm = ({ carId, updateCar }) => {
  const [updatedBrand, setUpdatedBrand] = useState('');
  const [updatedModel, setUpdatedModel] = useState('');
  const [updatedYear, setUpdatedYear] = useState('');
  const [updatedImage, setUpdatedImage] = useState('');

  const handleUpdate = () => {
    // Make sure all required fields are filled
    if (!updatedBrand || !updatedModel || !updatedYear || !updatedImage) {
      alert('Please fill in all fields');
      return;
    }

    // Create an object with the updated values
    const updatedData = {
      brand: updatedBrand,
      model: updatedModel,
      year: updatedYear,
      image: updatedImage,
    };

    // Call the updateCar function with the carId and updatedData
    updateCar(carId, updatedData);

    // Optionally, you can reset the form fields
    setUpdatedBrand('');
    setUpdatedModel('');
    setUpdatedYear('');
    setUpdatedImage('');
  };

  return (
    <div>
      <h2>Update Car</h2>
      <label>
        Brand:
        <input type="text" value={updatedBrand} onChange={(e) => setUpdatedBrand(e.target.value)} />
      </label>
      <label>
        Model:
        <input type="text" value={updatedModel} onChange={(e) => setUpdatedModel(e.target.value)} />
      </label>
      <label>
        Year:
        <input type="number" value={updatedYear} onChange={(e) => setUpdatedYear(e.target.value)} />
      </label>
      <label>
        Image:
        <input type="text" value={updatedImage} onChange={(e) => setUpdatedImage(e.target.value)} />
      </label>
      <button onClick={handleUpdate}>Update Car</button>
    </div>
  );
};

export default UpdateCarForm;
