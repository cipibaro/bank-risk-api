const mongoose = require('mongoose');

const activitySectorSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('activity-sectors', activitySectorSchema);