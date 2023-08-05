const mongoose = require('mongoose');

var Schema = mongoose.Schema;

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
        required: true
    },
    sex: {
        type: String,
        enum: ['m', 'f'],
        required: true
    },
    pob: {
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
    ci: {
        type: String,
        min: 2,
        max: 2,
        required: true
    },
    nr: {
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
    carOwner: {
        type: Boolean,
        default: false,
    },
    peopleInCare: {
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
    yearsOfWork: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    debt: {
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
    activitySector: {
        type: Schema.Types.ObjectId, ref: 'activitySector',
        required: true
    }
});


module.exports = mongoose.model('Client', clientSchema);