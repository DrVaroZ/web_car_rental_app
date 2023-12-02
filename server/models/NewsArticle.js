const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortContent: { type: String, required: true },
  image: { type: String, required: true },
  fullArticleLink: { type: String, required: true },
});

const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);

module.exports = NewsArticle;
