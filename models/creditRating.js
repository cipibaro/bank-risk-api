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

// Instance methods for CRUD operations
creditRatingSchema.methods.createCreditRating = function () {
    return this.save();
};

creditRatingSchema.methods.getCreditRatingById = function (creditRatingId) {
    return this.model('CreditRating').findById(creditRatingId);
};

creditRatingSchema.methods.updateCreditRating = function (updateData) {
    Object.assign(this, updateData);
    return this.save();
};

creditRatingSchema.methods.deleteCreditRating = function () {
    return this.remove();
};

module.exports = mongoose.model('Credit-Rating', creditRatingSchema);
