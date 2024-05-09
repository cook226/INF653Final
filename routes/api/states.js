// Import necessary modules
const express = require('express');
const router = express.Router();
const path = require('path');

// Import controller functions and middleware
const statesController = require('../../controller/statesController');
const verifyStateCodes = require('../../middleware/verifyStates');

// Import models/data
const State = require('../../model/State');
const data = require('../../model/statesData.json');

// Define routes

// GET: All states
router.get('/', statesController.getAllStates);

// GET: Single state data (verified by state code)
router.get('/:state', verifyStateCodes, statesController.getSingleState);

// GET: State capital information
router.get('/:state/capital', verifyStateCodes, statesController.getStateCapital);

// GET: State nickname
router.get('/:state/nickname', verifyStateCodes, statesController.getStateNickname);

// GET: State population
router.get('/:state/population', verifyStateCodes, statesController.getStatePopulation);

// GET: State admission date
router.get('/:state/admission', verifyStateCodes, statesController.getStateAdmission);

// GET: Fun fact about a state
router.get('/:state/funfact', verifyStateCodes, statesController.getFunFact);

// POST: Add a new fun fact to the state
router.post('/:state/funfact', verifyStateCodes, statesController.addFunFact);

// PATCH: Update existing fun fact
router.patch('/:state/funfact', verifyStateCodes, statesController.updateFunFact);

// DELETE: Remove a fun fact
router.delete('/:state/funfact', verifyStateCodes, statesController.deleteFunFact);

// Export the router for use in other modules
module.exports = router;
