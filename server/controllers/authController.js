const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials : User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials : Incorrect password' });
    }

    console.log('fuking Token is generating');

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', {
      expiresIn: '1000h', // Token expiration time
    });

    if (!token){
      console.log('fuking Token was not generated');
    }
    else{
      console.log('fuking Token was generated!!!');
    }

    res.status(200).json({ token, userId: user._id, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
 
};

const getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret key

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { register, login, getCurrentUser };
