const Car = require('../models/car');
const mongoose = require('mongoose');

// Контроллер для создания нового автомобиля
const createCar = async (req, res) => {
  try {
    const { brand, model, year, image } = req.body;

    const newCar = new Car({
      brand,
      model,
      year,
      image,
    });

    console.log('xuo')
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    console.error('Error creating car:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Контроллер для получения списка всех автомобилей
const getAllCars = async (req, res) => {
  try {
    const { sort, brand, model, year } = req.query;
    console.log('Received search term - brand:', brand);
    console.log('Received search term - model:', model);
    console.log('Received search term - year:', year);

    let filter = {}; // Default filter without brand, model, or year

    if (brand) {
      const regexBrand = new RegExp(brand, 'i');
      filter.brand = regexBrand;
    }

    if (model) {
      const regexModel = new RegExp(model, 'i');
      filter.model = regexModel;
    }

    if (year) {
      filter.year = year;
    }

    let sortOptions = {};

    if (sort === 'year') {
      sortOptions = { year: 1 };
    } else if (sort === '-year') {
      sortOptions = { year: -1 };
    } else if (sort === 'brand') {
      sortOptions = { brand: 1 };
    } else if (sort === '-brand') {
      sortOptions = { brand: -1 };
    } else if (sort === 'model') {
      sortOptions = { model: 1 };
    } else if (sort === '-model') {
      sortOptions = { model: -1 };
    }

    const cars = await Car.find(filter).sort(sortOptions);
    res.json(cars);
  } catch (error) {
    console.error('Error in getAllCars:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


  const updateCar = async (req, res) => {
    const { carId } = req.params;
    const { brand, model, year, image } = req.body;
  
    try {
      // Find the car by ID and update its data
      const updatedCar = await Car.findByIdAndUpdate(carId, { brand, model, year, image, }, { new: true });
      res.json(updatedCar);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const deleteCar = async (req, res) => {
    const { carId } = req.params;
  
    try {
      // Найдем машину по ID и удалим ее
      await Car.findByIdAndDelete(carId);
      res.json({ message: 'Car deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getCarById = async (req, res) => {
    try {
      const { carId } = req.params;

        const updatedCar = await Car.findOneAndUpdate(
            { _id: carId },
            { new: true } 
        );

        if (!updatedCar) {
            return res.status(404).json({
                message: 'Cannot find a car',
            });
        }


        res.json(updatedCar);
    } catch (error) {
      console.log(error);

        res.status(500).json({
            message: 'Error in getting a car',
        });
    }
  };
  
  
  module.exports = {
    createCar,
    getAllCars,
    updateCar,
    deleteCar,
    getCarById,
  };
  
