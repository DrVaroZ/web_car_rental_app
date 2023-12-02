const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', authMiddleware, getCurrentUser); // Require authentication middleware

module.exports = router;
