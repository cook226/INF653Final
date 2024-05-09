// Load environment variables from .env file
require('dotenv').config();

// Import dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

// Custom imports
const statesController = require('./controller/statesController');
const verifyStateCodes = require('./middleware/verifyStates');
const statesData = require('./model/statesData.json');
const { applyDefaults } = require('./model/State');
const connectDB = require('./config/dbConn');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware for parsing incoming requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route for API endpoints related to states
app.use('/states', require('./routes/api/states'));

// Catch-all route for undefined paths, responding with 404
app.all('*', (req, res) => {
    res.status(404);

    // Respond based on the requested content type
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

// Start the server after successfully connecting to MongoDB
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
