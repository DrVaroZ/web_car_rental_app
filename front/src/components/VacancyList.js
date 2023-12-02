import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/vacancies_page.css';

const VacancyList = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vacancies');
        setVacancies(response.data);
      } catch (error) {
        console.error('Error fetching vacancies:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="vacancy-container">
      <h2>Vacancies</h2>
      <ul className="vacancy-list">
        {vacancies.map((vacancy) => (
          <li key={vacancy._id} className="vacancy">
            <h3>{vacancy.position}</h3>
            <p>{vacancy.description}</p>
            <p>Salary: ${vacancy.salary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VacancyList;