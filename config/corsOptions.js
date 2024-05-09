// Import list of allowed origins
const allowedOrigins = require('./allowedOrigins');

// Define CORS options configuration
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests from allowed origins or requests without an origin (like server-to-server)
        const isAllowed = allowedOrigins.includes(origin) || !origin;
        
        // Allow the request by passing `true` as the second parameter
        callback(null, isAllowed);
    },
    // Ensure successful pre-flight responses have status 200
    optionsSuccessStatus: 200
};

// Export CORS options for external use
module.exports = corsOptions;
