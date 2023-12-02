const Vacancy = require('../models/Vacancy');

const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    res.status(200).json(vacancies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const postVacancy = async (req, res) => {
  try {
    const { position, description, salary } = req.body;

    const newVacancy = new Vacancy({
      position,
      description,
      salary,
    });

    await newVacancy.save();

    res.status(201).json({ message: 'Vacancy posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllVacancies, postVacancy };