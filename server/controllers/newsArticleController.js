const NewsArticle = require('../models/newsArticle');

const getAllNewsArticles = async (req, res) => {
  try {
    const newsArticles = await NewsArticle.find();
    res.status(200).json(newsArticles);
  } catch (error) {
    console.error('Error fetching news articles:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createNewsArticle = async (req, res) => {
    try {
      const { title, shortContent, image, fullArticleLink } = req.body;
  
      const newArticle = new NewsArticle({
        title,
        shortContent,
        image,
        fullArticleLink,
      });
  
      await newArticle.save();
  
      res.status(201).json({ message: 'News article created successfully' });
    } catch (error) {
      console.error('Error creating news article:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = { getAllNewsArticles, createNewsArticle };
