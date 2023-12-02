const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancyController');

router.get('/vacancies', vacancyController.getAllVacancies);
router.post('/vacancy', vacancyController.postVacancy);

module.exports = router;