import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/login_page.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });

      // Check if the response contains a token
      //const { token, userId } = response.data;
      /*
      if (!token || !userId) {
        console.error('Token or userId is missing in the response.');
        return;
      }*/

      // Save token and userId to local storage
      localStorage.setItem('token', response.data.token);
      console.log('Set token to local storage');
      console.log(response.data.token);
      //localStorage.setItem('userId', userId);

      // Set authentication state to true
      console.log(response.data);
      onLogin(response.data);

      // Redirect to the main page after successful login
      navigate('/car-list');
    } catch (error) {
      console.error(error.response?.data[0]?.message || 'Internal server error');
      setLoginError('Incorrect username or password');
    }
  };

  useEffect(() => {
    // If the user is already authenticated, redirect to the main page
    if (localStorage.getItem('token')) {
      navigate('/car-list');
    }
  }, [navigate]);

  return (
    <div className="login_container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}

    </div>
  );
};

export default Login;
