const mongoose = require('mongoose');

const { Schema } = mongoose;

const launchSchema = new Schema({

    flightNumber: {
        type: Number,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },

    mission : {
        type: String,
        required : true
    },
    target: {
        type: String,
    },
    customers: [String],
    success: {
        type: Boolean,
        required: true
    },
    upcoming: {
        type: Boolean,
        required: true
    }
    
});

module.exports = mongoose.model('Launch', launchSchema);