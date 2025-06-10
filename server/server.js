require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dbRoutes = require('./routes/db');

app.use(cors({
  origin: 'https://billing-app-frontend-six.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Optional: For preflight requests
app.options('*', cors());

app.use(express.json());
// Test route
app.get('/', (req, res) => {
    res.send('🚀 Server is running!');
});

// MongoDB connection
mongoose.connect(process.env.DATABASE)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => {
        console.error('❌ MongoDB Error:', err);
        process.exit(1);
    });
// Main API routes
app.use('/api', dbRoutes);

// Export for Vercel
module.exports = app;

