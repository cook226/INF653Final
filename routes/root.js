// Import required modules
const express = require('express');
const path = require('path');

// Create a router instance
const router = express.Router();

// Define the route for the root URL ('/')
// This sends the index.html file located in the 'views' directory
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Export the router module
module.exports = router;
