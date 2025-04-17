const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const avatarRoutes = require('./routes/avatars');
const moviesRoutes = require('./routes/movies');
const reviewRoutes = require('./routes/reviews');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/avatars', avatarRoutes);
app.use('/api/movies', moviesRoutes); 
app.use('/api/reviews', reviewRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
