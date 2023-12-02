import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate, NavLink } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CarForm from './components/CarForm';
import CarList from './components/CarList';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import CarDetails from './components/CarDetails';
import NewsArticleList from './components/NewsArticleList';
import VacancyList from './components/VacancyList';
import './styles/app_page.css';

const App = () => {
  
  const [carListUpdated, setCarListUpdated] = useState(false);
  //const [isAuthenticated, setAuthenticated] = useState(false);

  const updateCarList = () => {
    setCarListUpdated(!carListUpdated);
  };

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('local storage is empty');
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
    window.location.reload();
  };



  return (
    <Router>
      <div>
      <nav className="navigation-bar">
      <ul className="pages-list">
        <li className="page-link-item">
          <Link to="/car-list">Main</Link>
        </li>
        <li className="page-link-item">
          <Link to="/news-articles">News</Link>
        </li>
        <li className="page-link-item">
          <Link to="/vacancies">Vacancies</Link>
        </li>
        <li className="page-link-item">
          <Link to="/">Quit</Link>
        </li>
      </ul>
    </nav>
        <h1>Car Rental App</h1>
        <Routes>
          <Route path="/" element={<LandingPage loggedInUser = {loggedInUser} onLogout = {handleLogout}  />} />
          <Route path="/login" element = {loggedInUser ? <Navigate to="/car-list" /> : <Login onLogin={(user) => setLoggedInUser(user)} />} >
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/car-form" element={<CarForm loggedInUser={loggedInUser} updateCars={updateCarList} />} />
          { /*<Route path="/car-form" element={<CarForm updateCars={updateCarList} />} />*/}
          <Route path="/car-list" element={<CarList loggedInUser={loggedInUser} key={carListUpdated} />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
          <Route path="/news-articles" element={<NewsArticleList />} />
          <Route path="/vacancies" element={<VacancyList />} />
        </Routes>
        {/* Place the link outside of the Routes */}
        
      </div>
    </Router>
  );
};

export default App;
