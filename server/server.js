const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const workoutRoutes = require('./routes/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://billing-app-client.vercel.app/', // or your React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to Sanghamitra Billing App');
});

// Routes
app.use('/api', workoutRoutes);

// MongoDB connection
mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });


// Export for Vercel
module.exports = app;
