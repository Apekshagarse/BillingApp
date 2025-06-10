require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dbRoutes = require('../routes/db'); // Adjusted for relative path

app.use(cors({
  origin: 'https://billing-app-frontend-six.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.options('*', cors());
app.use(express.json());

app.get('/', (req, res) => res.send('🚀 Server is running!'));

mongoose.connect(process.env.DATABASE)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB Error:', err);
    process.exit(1);
  });

app.use('/api', dbRoutes);

module.exports = app;
