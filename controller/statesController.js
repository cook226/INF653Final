// Import necessary modules and data
const State = require('../model/State');
const statesData = require('../model/statesData.json');

// Data structure for in-memory state data
const data = {
    states: statesData,
    setStates: function (data) {
        this.states = data;
    }
};

// Function to merge additional fun facts into the states data
async function mergeModels() {
    for (const state of data.states) {
        const fact = await State.findOne({ stateCode: state.code }).exec();
        if (fact) {
            state.funfacts = fact.funfacts;
        }
    }
}
mergeModels();

// Controller to handle retrieving all states, filtered by contiguous/non-contiguous
const getAllStates = async (req, res) => {
    const contig = req.query.contig;

    // Handle contiguous state filtering
    if (contig === "true") {
        const responseData = statesData.filter(state => state.code !== "AK" && state.code !== "HI");
        return res.json(responseData);
    }

    // Handle non-contiguous state filtering
    if (contig === "false") {
        const responseData = statesData.filter(state => state.code === "AK" || state.code === "HI");
        return res.json(responseData);
    }

    // Retrieve fun facts for all states if no specific filtering is requested
    const stateWithFunFacts = [];
    const states = await State.find({});
    for (const state of statesData) {
        const funfactState = states.find(st => st.stateCode === state.code);
        stateWithFunFacts.push(funfactState ? { ...state, funfacts: funfactState.funfacts } : { ...state });
    }
    res.json(stateWithFunFacts);
};

// Controller to handle retrieving a single state's details
const getSingleState = async (req, res) => {
    const code = req.code;
    const state = await State.findOne({ stateCode: code });
    const stateData = data.states.find(state => state.code === code);

    // If the state has fun facts, add them to the response
    if (state && state.funfacts) {
        stateData.funfacts = state.funfacts;
    }
    res.json(stateData);
};

// Controller to retrieve the capital city of a state
const getStateCapital = async (req, res) => {
    const code = req.code;
    const stateData = data.states.find(state => state.code === code);
    res.json({ state: stateData.state, capital: stateData.capital_city });
};

// Controller to retrieve a state's nickname
const getStateNickname = async (req, res) => {
    const code = req.code;
    const stateData = data.states.find(state => state.code === code);
    res.json({ state: stateData.state, nickname: stateData.nickname });
};

// Controller to retrieve a state's population
const getStatePopulation = async (req, res) => {
    const code = req.code;
    const stateData = data.states.find(state => state.code === code);
    res.json({ state: stateData.state, population: stateData.population.toLocaleString() });
};

// Controller to retrieve a state's admission date
const getStateAdmission = async (req, res) => {
    const code = req.code;
    const stateData = data.states.find(state => state.code === code);
    res.json({ state: stateData.state, admitted: stateData.admission_date });
};

// Controller to retrieve a random fun fact for a state
const getFunFact = async (req, res) => {
    const stateCode = req.code;
    const stateName = data.states.find(state => state.code === stateCode).state;
    const state = await State.findOne({ stateCode });

    // Return error if no fun facts found
    if (!state || !state.funfacts || state.funfacts.length === 0) {
        return res.status(404).json({ message: `No Fun Facts found for ${stateName}` });
    }

    // Select a random fun fact
    const randomFunFact = Math.floor(Math.random() * state.funfacts.length);
    res.json({ funfact: state.funfacts[randomFunFact] });
};

// Controller to add new fun facts to a state
const addFunFact = async (req, res) => {
    if (!req.body.funfacts) {
        return res.status(400).json({ message: 'State fun facts value required' });
    }

    if (!Array.isArray(req.body.funfacts)) {
        return res.status(404).json({ message: 'State fun facts value must be an array' });
    }

    try {
        // Update or create state with new fun facts
        const state = await State.findOne({ stateCode: req.code });
        if (state) {
            const updatedState = await State.findOneAndUpdate(
                { stateCode: req.code },
                { $push: { funfacts: req.body.funfacts } },
                { new: true }
            );
            return res.json(updatedState);
        }

        const newData = new State({ stateCode: req.code, funfacts: req.body.funfacts });
        await newData.save();
        res.json(newData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding fun fact');
    }
};

// Controller to update a specific fun fact in a state
const updateFunFact = async (req, res) => {
    const { index, funfact } = req.body;

    if (!index || index <= 0) {
        return res.status(400).json({ message: 'State fun fact index value required' });
    }

    if (!funfact) {
        return res.status(400).json({ message: 'State fun fact value required' });
    }

    const stateCode = req.code;
    const stateName = data.states.find(state => state.code === stateCode).state;
    const state = await State.findOne({ stateCode });

    // Check if the state and index are valid
    if (!state) {
        return res.status(400).json({ message: `No Fun Facts found for ${stateName}` });
    }

    if (index > state.funfacts.length) {
        return res.status(400).json({ message: `No Fun Fact found at that index for ${stateName}` });
    }

    // Update the specific fun fact at the given index
    state.funfacts = state.funfacts.map((fact, idx) => (index === idx + 1 ? funfact : fact));
    await state.save();
    res.json(state);
};

// Controller to delete a specific fun fact from a state
const deleteFunFact = async (req, res) => {
    const { index } = req.body;
    if (!index || index <= 0) {
        return res.status(400).json({ message: 'State fun fact index value required' });
    }

    const stateCode = req.code;
    const state = await State.findOne({ stateCode });
    const stateName = data.states.find(state => state.code === stateCode).state;

    // Check if the state and index are valid
    if (!state || !state.funfacts || state.funfacts.length === 0) {
        return res.status(400).json({ message: `No Fun Facts found for ${stateName}` });
    }

    if (index > state.funfacts.length) {
        return res.status(400).json({ message: `No Fun Fact found at that index for ${stateName}` });
    }

    // Remove the fun fact at the specified index
    state.funfacts = state.funfacts.filter((fact, idx) => index !== idx + 1);
    await state.save();
    res.json(state);
};

// Export the controller functions
module.exports = {
    getAllStates,
    getSingleState,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmission,
    getFunFact,
    addFunFact,
    updateFunFact,
    deleteFunFact
};
