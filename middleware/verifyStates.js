const statesData = require('../model/statesData.json');

// Middleware function to verify state code validity
const verifyStateCodes = (req, res, next) => {
  // Extract and normalize the state code to uppercase
  const stateCode = req.params.state;
  const upperCaseCode = stateCode.toUpperCase();
  
  // List of valid state codes
  const statesCodes = statesData.map(state => state.code);

  // Check if the state code is valid
  const isStateAbbreviationValid = (upperCaseCode) => {
    return statesCodes.includes(upperCaseCode);
  };

  // If the state code is invalid, return an error response
  if (!isStateAbbreviationValid(upperCaseCode)) {
    return res.status(404).send({ 'message': 'Invalid state abbreviation parameter' });
  }

  // Store the validated state code in the request object
  req.code = upperCaseCode;

  // Proceed to the next middleware or route handler
  next();
};

module.exports = verifyStateCodes;
