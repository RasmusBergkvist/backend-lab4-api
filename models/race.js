const mongoose = require("mongoose");

//Schema för lopp
const raceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    place: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    createdBy: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,

});

const Race = mongoose.model("Race", raceSchema);

//Exportera Race
module.exports = Race;