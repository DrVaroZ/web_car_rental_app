const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Auth failed: No token provided' });
    }
    
    const token = req.headers.authorization.split(' ')[1];
    console.log('Received Token middleware:', token); // Log the received token

    if (!token) {
      return res.status(401).json({ message: 'Auth failed: No token provided' });
    }

    const decodedToken = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret key
    console.log('Decoded Token:', decodedToken); // Log the decoded token

    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Auth failed: Invalid token' });
  }
};

module.exports = authMiddleware;
