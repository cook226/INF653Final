const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    state: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    nickname: {
        type: String,
        require: true
    },
    website: {
        type: String,
        require: true
    },
    admission_date: {
        type: String,
        require: true
    },
    admission_number: {
        type: Number,
        require: true
    },
    capital_city: {
        type: String,
        require: true
    },
    capital_url: {
        type: String,
        require: true
    },
    population: {
        type: Number,
        require: true
    },
    population_rank: {
        type: Number,
        require: true
    },
    constitution_url: {
        type: String,
        require: true
    },
    state_flag_url: {
        type: String,
        require: true
    },
    state_seal_url: {
        type: String,
        require: true
    },
    map_image_url: {
        type: String,
        require: true
    },
    landscape_background_url: {
        type: String,
        require: true
    },
    skyline_background_url: {
        type: String,
        require: true
    },
    twitter_url: {
        type: String,
        require: true
    },
    facebook_url: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('State', stateSchema);
