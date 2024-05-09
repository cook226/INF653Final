// Import the mongoose library
const mongoose = require('mongoose');

// Asynchronously connect to the MongoDB database
const connectDB = async () => {
    try {
        // Connect using environment variable for database URI
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,  // Use the new unified topology engine
            useNewUrlParser: true      // Use the new URL parser
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

// Export the connectDB function for use in other modules
module.exports = connectDB;
