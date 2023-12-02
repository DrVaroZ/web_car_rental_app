const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authRoutes'); // Предположим, что у вас есть файл authRoutes.js
const newsRoutes = require('./routes/newsArticleRoutes');
const vacancyRoutes = require('./routes/vacancyRoutes');

const app = express();

// Разрешаем CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === 'http://localhost:3000') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

//app.use(cors(corsOptions));

// Подключение к базе данных
connectDB();

// Middleware
app.use(bodyParser.json());

// API Routes
app.use('/api', apiRoutes);

app.use('/api', newsRoutes);

app.use('/api', vacancyRoutes);

// Auth Routes
app.use('/auth', authRoutes);

// Запуск сервера на порту 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
