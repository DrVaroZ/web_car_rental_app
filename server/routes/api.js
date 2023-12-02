const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for creating a new car, only accessible to authenticated users
router.post('/cars', authMiddleware, carController.createCar);

// Route for getting a list of all cars, accessible to all users
router.get('/cars', carController.getAllCars);

// Route for updating a car, only accessible to authenticated users
router.put('/cars/:carId', authMiddleware, carController.updateCar);

// Route for deleting a car, only accessible to authenticated users
router.delete('/cars/:carId', authMiddleware, carController.deleteCar);

router.get('/cars/:carId', carController.getCarById)


module.exports = router;
