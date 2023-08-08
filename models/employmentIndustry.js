const mongoose = require('mongoose');

const employmentIndustrySchema = mongoose.Schema({
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



const EmploymentIndustry = mongoose.model('employment-industry', employmentIndustrySchema);
module.exports = EmploymentIndustry;

