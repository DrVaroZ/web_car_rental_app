import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/news_page.css';

const NewsArticleList = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news');
        setNewsArticles(response.data);
      } catch (error) {
        console.error('Error fetching news articles:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsArticles();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="news-container">
      <h2>News Articles</h2>
      <ul className="news-list">
        {newsArticles.map((article) => (
          <li key={article._id} className="news-article">
            <h3>{article.title}</h3>
            <p>{article.shortContent}</p>
            <img src={article.image} alt={article.title} />
            <a href={article.fullArticleLink} target="_blank" rel="noopener noreferrer">
              Read Full Article
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsArticleList;
