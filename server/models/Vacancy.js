const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

const Vacancy = mongoose.model('Vacancy', vacancySchema);

module.exports = Vacancy;