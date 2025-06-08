require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dbRoutes = require('./routes/db');

// CORS config
app.use(cors({
    origin: ['https://billing-app-frontend-six.vercel.app'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// Allow preflight
app.options('*', cors());

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.DATABASE, {
    dbName: 'BillingApp',
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => {
    console.error('❌ MongoDB Error:', err);
    process.exit(1);
});

// Test route
app.get('/', (req, res) => {
    res.send('🚀 Server is running!');
});

// Test POST route (optional)
app.post('/test', (req, res) => {
    res.send('✅ POST request works!');
});

// Main API routes
app.use('/api', dbRoutes);

// Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
