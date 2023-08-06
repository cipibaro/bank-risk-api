const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const creditRatingSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    client_id: {
        type: Schema.Types.ObjectId, ref: 'clients',
    },
    totalCreditScore: {
        type: Number,
    },
    creditRating: {
        type: String,
        enum: ['Excellent Credit (Low Risk)', 'Very Good Credit (Low Risk)', 'Good Credit (Moderate Risk)', 'Fair Credit (Moderate to High Risk)', 'Poor Credit (High Risk)', 'Possible creditworthy client (Upper Approximation)', 'Not creditworthy']
    }
});

module.exports = mongoose.model('CreditRating', creditRatingSchema);