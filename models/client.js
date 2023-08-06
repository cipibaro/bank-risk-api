const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const clientSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    cnp: {
        type: String,
        min: 13,
        max: 13,
        unique: true,
        required: true
    },
    sex: {
        type: String,
        enum: ['m', 'f'],
        required: true
    },
    placeOfBirth: {
        type: String,
        require: true,
    },
    countyOfb: {
        type: String,
        require: true,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    series: {
        type: String,
        min: 2,
        max: 2,
        required: true
    },
    seriesNumber: {
        type: String,
        min: 6,
        max: 6,
        required: true,
    },
    studies: {
        type: String,
        enum: ['Liceu', 'Universitate', 'Postlicela', 'Studii Primare'],
        required: true,
    },
    age: {
        type: Number,
        min: 18,
        max: 100,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    politicalExposure: {
        type: Boolean,
        default: false,
    },
    ownsCar: {
        type: Boolean,
        default: false,
    },
    dependents: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    relationshipStatus: {
        type: String,
        enum: ['Necasatorit', 'Casatorit', 'Concubinaj', 'Divortat', 'Vaduv'],
        required: true,
    },
    relationshipAge: {
        type: Number,
        min: 1,
        max: 100
    },
    income: {
        type: Number,
        min: 1,
        required: true
    },
    lengthOfEmployment: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    outstandingDebt: {
        type: Number,
        min: 0,
        required: true
    },
    occupation: {
        type: String,
        enum: ['Angajat', 'Pensionar'],
        required: true
    },
    typeOfIncome: {
        type: String,
        enum: ['Pensie', 'Salariu'],
        required: true
    },
    employmentIndustry: {
        type: Schema.Types.ObjectId, ref: 'employment-Industry',
        required: true
    },
    profession: {
        type: Schema.Types.ObjectId, ref: 'profession',
        required: true
    },
    creditHistory: {
        type: String,
        Enum: ["Foarte bun", "Bun", "Fara istoric"],
        required: true
    },
    paymentHistory: {
        type: String,
        enum: ["Foarte bun platnic","Bun platnic", "Rau platnic"],
        required: true
    },
    existingCreditAccounts: {
        type: Number,
        required: true
    }
});
const clientLowRisk = new Client("John", 35, 3000, 1201, "Good", 0.2, "Employed", true, true, "Casatorit", 5, "Liceu", 20, 0, 15, "Good", "Finance");


module.exports = mongoose.model('Client', clientSchema);