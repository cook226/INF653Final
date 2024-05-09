// Import the Mongoose library
const mongoose = require('mongoose');

// Create a schema object
const Schema = mongoose.Schema;

// Define the State schema with its properties
const stateSchema = new Schema({
    // State code, must be unique and required
    stateCode: {
        type: String,
        required: true,
        unique: true
    },
    // An array of fun facts about the state
    funfacts: {
        type: [String]
    }
});

// Export the model using the schema
module.exports = mongoose.model('State', stateSchema);
