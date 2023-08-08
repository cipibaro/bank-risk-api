const mongoose = require('mongoose');

const creditRatingSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients',
    },
    totalCreditScore: {
        type: Number,
    },
    creditRating: {
        type: String,
        enum: [
            'Excellent Credit (Very Low Risk)',
            'Very Good Credit (Low Risk)',
            'Good Credit (Moderate Risk)',
            'Fair Credit (Moderate to High Risk)',
            'Poor Credit (High Risk)',
            'Possible creditworthy client (Upper Approximation)',
            'Not creditworthy',
        ],
    },
});


module.exports = mongoose.model('Client-Credit-Rating', creditRatingSchema);
