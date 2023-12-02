import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import UpdateCarForm from './UpdateCarForm';
import AuthButtons from './AuthButtons';
import { Link } from 'react-router-dom';
import CarDetails from './CarDetails';
import JokeAPI from './JokeAPI';
import QuoteAPI from './QuoteAPI';
import DateTimeInfo from './DateTimeInfo';
import './styles/car_list_page.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchModel, setSearchModel] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch car list
     const fetchCarList = async () => {
       try {
         const token = localStorage.getItem('token');
         if (!token) {
          // Handle case where token is missing
           console.error('Token is missing.');
           return;
         }
    
         const response = await axios.get(`http://localhost:5000/api/cars${sortBy ? `?sort=${sortBy}` : ''}${searchTerm ? `&brand=${searchTerm}` : ''}${searchModel ? `&model=${searchModel}` : ''}${searchYear ? `&year=${searchYear}` : ''}`, {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         });
    
         setCars(response.data);
       } catch (error) {
         console.error('Error fetching car list:', error.message);
       }
     };
    
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));
    if (token) {
      axios.get('http://localhost:5000/auth/current-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data);
        setLoggedInUser(response.data);
      })
      .catch(error => {
        console.error('Token verification error:', error.message, token);
      });
    }

    fetchCarList();
  }, [sortBy, searchTerm, searchModel, searchYear]); // Empty dependency array to run the effect only once



  const handleSortByYear = () => {
    const newSortBy = sortBy === 'year' ? '-year' : 'year';
    setSortBy(newSortBy);
    fetchCarList(); // Add this line to trigger fetch after sorting
  };

  const handleSortByBrand = () => {
    const newSortBy = sortBy === 'brand' ? '-brand' : 'brand';
    setSortBy(newSortBy);
    fetchCarList(); // Add this line to trigger fetch after sorting
  };

  const handleSortByModel = () => {
    const newSortBy = sortBy === 'model' ? '-model' : 'model';
    setSortBy(newSortBy);
    fetchCarList(); // Add this line to trigger fetch after sorting
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
    window.location.reload();
  };



 
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:5000/auth/current-user');
        const userData = userResponse.data.user;
  
        if (userData) {
          setCurrentUser(userData);
        } else {
          setCurrentUser(null);
        }
  
        // Fetch car list after setting currentUser
        await fetchCarList();
      } catch (error) {
        console.error('Error fetching current user or car list:', error.message);
      }
    };
  
    fetchData(); // Invoke the fetchData function
  }, [sortBy, searchTerm, searchModel, searchYear]);*/
  
  /*
  useEffect(() => {
    // Fetch car list when the component mounts
    fetchCarList();
  }, []);*/

  const fetchCarList = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cars${sortBy ? `?sort=${sortBy}` : ''}${searchTerm ? `&brand=${searchTerm}` : ''}${searchModel ? `&model=${searchModel}` : ''}${searchYear ? `&year=${searchYear}` : ''}`);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching car list:', error.message);
    }
  };

  // Fetch current user data
  /*
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/current-user');
      setCurrentUser(response.data.user || null);  // Set to null if user data is undefined
    } catch (error) {
      console.error('Error fetching current user:', error.message);
    }
  };*/
  

  const handleUpdateClick = (car) => {
    setSelectedCar(car);
  };

  const handleUpdateCar = async (carId, updatedData) => {
    var token = localStorage.getItem('token');

    try {
      await axios.put(`http://localhost:5000/api/cars/${carId}`, updatedData,
      
    {
      headers: {
        Authorization: `Bearer ${token}`,
    },
  } );
      fetchCarList();
      setSelectedCar(null); // Close the form after updating
    } catch (error) {
      console.error('Error updating car:', error.message);
    }
  };

  const handleCancelUpdate = () => {
    setSelectedCar(null); // Close the form without updating
  };

  const handleDeleteCar = async (carId) => {
    var token = localStorage.getItem('token');

    try {
      // Отправка запроса на удаление машины
      await axios.delete(`http://localhost:5000/api/cars/${carId}`,
     {
      headers: {
        Authorization: `Bearer ${token}`,
    },
    });
  
      // После успешного удаления обновляем список
      fetchCarList();
    } catch (error) {
      console.error('Error deleting car:', error.message);
    }
  };

  /*
  const handleGetCarDetails = (carId) => {
    // Redirect to the CarDetails page with the carId as a parameter
    navigate(`/car-details/${carId}`);
  };*/

  console.log('Current User:', loggedInUser); // Add this line for debugging


  return (
    <div className="car-list-container">
      <DateTimeInfo />
      <h2>Car List</h2>
      {loggedInUser && <p>Welcome, {loggedInUser.username}!</p>}
      <AuthButtons isAuthenticated={!!loggedInUser} onLogout={handleLogout} />

      <button onClick={handleSortByYear}>Sort by Year</button>
      <button onClick={handleSortByBrand}>Sort by Brand</button>
      <button onClick={handleSortByModel}>Sort by Model</button>
      <input type="text" placeholder="Search by Brand" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <input type="text" placeholder="Search by Model" value={searchModel} onChange={(e) => setSearchModel(e.target.value)} />
      <input type="text" placeholder="Search by Year" value={searchYear} onChange={(e) => setSearchYear(e.target.value)} />
      <ul className="car-list">
        {cars.map((car) => (
          <li key={car._id} className="car-item">
            <img src={car.image} alt={car.brand} />
            {/* Use Link component to navigate to CarDetails */}
            <Link to={`/car-details/${car._id}`}>Details</Link>
            {loggedInUser&&<button onClick={() => handleUpdateClick(car)}>Update</button>}
            {loggedInUser&&<button onClick={() => handleDeleteCar(car._id)}>Delete</button>}
          </li>
        ))}
      </ul>
      {selectedCar && (
        <UpdateCarForm
          carId={selectedCar._id}
          updateCar={handleUpdateCar}
          onCancel={handleCancelUpdate}
        />
      )}
      { loggedInUser&&<Link to="/car-form">Create a New Car</Link>}
      <h3>Joke:</h3>
      <div className="joke-container">
      {<JokeAPI/>}
      </div>
      <h3>Quote:</h3>
      <div className="quote-container">
      {<QuoteAPI/>}
      </div>

    </div>
    
  );
};

export default CarList;