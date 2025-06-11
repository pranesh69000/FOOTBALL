const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables with absolute path
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

// Debug information
console.log('Environment file path:', envPath);
console.log('Current directory:', __dirname);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log('MongoDB URI exists:', !!MONGODB_URI);

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    console.error('Please create a .env file in the server directory with your MongoDB Atlas connection string');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Routes
const playerRoutes = require('./routes/players');
app.use('/api/players', playerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 