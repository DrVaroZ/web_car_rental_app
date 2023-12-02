const express = require('express');
const router = express.Router();
const newsArticleController = require('../controllers/newsArticleController');

router.get('/news', newsArticleController.getAllNewsArticles);
router.post('/news-article', newsArticleController.createNewsArticle);

module.exports = router;
