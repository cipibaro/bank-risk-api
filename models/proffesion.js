const mongoose = require('mongoose');

const professionSchema = mongoose.Schema({
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


module.exports = mongoose.model('profession', professionSchema);