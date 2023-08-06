const mongoose = require('mongoose');
const validator = require('validator');

let Schema = mongoose.Schema;


/*class Client{
    constructor(
        firstName,
        lastName,
        cnp,
        sex,
        placeOfBirth,
        countyOfBirth,
        dateOfBirth,
        series,
        seriesNumber,
        studies,
        age,
        nationality,
        politicalExposure,
        ownsCar,
        dependents,
        relationshipStatus,
        relationshipAge,
        income,
        lengthOfEmployment,
        outstandingDebt,
        occupation,
        typeOfIncome,
        employmentIndustry,
        profession,
        creditHistory,
        paymentHistory,
        existingCreditAccounts
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.cnp = cnp;
        this.sex = sex;
        this.placeOfBirth = placeOfBirth;
        this.countyOfBirth = countyOfBirth;
        this.dateOfBirth = dateOfBirth;
        this.series = series;
        this.seriesNumber = seriesNumber;
        this.studies = studies;
        this.age = age;
        this.nationality = nationality;
        this.politicalExposure = politicalExposure;
        this.ownsCar = ownsCar;
        this.dependents = dependents;
        this.relationshipStatus = relationshipStatus;
        this.relationshipAge = relationshipAge;
        this.income = income;
        this.lengthOfEmployment = lengthOfEmployment;
        this.outstandingDebt = outstandingDebt;
        this.occupation = occupation;
        this.typeOfIncome = typeOfIncome;
        this.employmentIndustry = employmentIndustry;
        this.profession = profession;
        this.creditHistory = creditHistory;
        this.paymentHistory = paymentHistory;
        this.existingCreditAccounts = existingCreditAccounts;
        this.dtiRatio = outstandingDebt / income;
    }
}*/


const clientSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    firstName: {
        type: String,
        required: [true, 'Name is essential']
    },
    lastName: {
        type: String,
        required: [true, 'Name is essential']
    },
    cnp: {
        type: String,
        required: [true, 'CNP is required'],
        validate: {
            validator: function (v) {
                return v.length === 13;
            },
            message: 'CNP must be exactly 13 characters long.',
        },
    },
    sex: {
        type: String,
        enum: ['m', 'f'],
        required: [true, 'Only M or F']
    },
    placeOfBirth: {
        type: String,
        require: [true, 'Place of birth required']
    },
    countyOfb: {
        type: String,
        require: [true, 'County of birth required']
    },
    dateOfBirth: {
        type: Date,
        require: [true, 'Date of birth required']
    },
    series: {
        type: String,

        required: [true, 'Series is required'],
        validate: {
            validator: function (v) {
                return v.length === 2;
            },
            message: 'series must be exactly 2 characters long.',
        },
    },
    seriesNumber: {
        type: String,
        required: [true, 'Series number is required'],
        validate: {
            validator: function (v) {
                return v.length === 6;
            },
            message: 'Series number must be exactly 6 characters long.',
        },
    },
    studies: {
        type: String,
        enum: ['Liceu', 'Universitate', 'Postlicela', 'Studii Primare'],
        required: [true, 'Provide a study type']
    },
    age: {
        type: Number,
        min: 18,
        max: 80,
        required: [true, 'Age is required'],
        validate(value) {
            if (value < 18) {
                throw new Error('You must be over 18');
            } else if (value > 80) {
                throw new Error("You are too old");
            }
        }
    },
    nationality: {
        type: String,
        required: [true, 'Nationality required']
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
        max: 20,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Number of dependents invalid');
            } else if (value > 20) {
                throw new Error('Too many dependends');
            }
        }
    },
    relationshipStatus: {
        type: String,
        enum: ['Necasatorit', 'Casatorit', 'Concubinaj', 'Divortat', 'Vaduv'],
        default: 'Necasatorit,'
    },
    relationshipAge: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        validate(value) {
            if (value < 0 || value > 100) {
                throw new Error('Relationship age is invalid');
            }
        }
    },
    income: {
        type: Number,
        min: 1,
        required: [true, 'Please provide an income']
    },
    lengthOfEmployment: {
        type: Number,
        min: 1,
        max: 70,
        required: [true, 'Provide length of employment'],
        validate(value) {
            if (value < 1 || value > 70) {
                throw new Error('length of employment is invalid');
            }
        }
    },
    outstandingDebt: {
        type: Number,
        min: 0,
        required: [true, 'Debt is required'],
        validate(value) {
            if (value < 0) {
                throw new Error('Debt cannot be negative');
            }
        }
    },
    occupation: {
        type: String,
        enum: ['Angajat', 'Pensionar'],
        required: [true, 'Provide an occupation']
    },
    typeOfIncome: {
        type: String,
        enum: ['Pensie', 'Salariu'],
        required: [true, 'Provide a type of income']
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
        required: [true, 'Provide cred history']
    },
    paymentHistory: {
        type: String,
        enum: ["Foarte bun platnic", "Bun platnic", "Rau platnic"],
        required: [true, 'Provide payment history']
    },
    existingCreditAccounts: {
        type: Number,
        min: 0,
        max: 50,
        required: [true, 'Please tell us if you have any credit card'],
        validate(value) {
            if (value < 0 || value > 50) {
                throw new Error('Number of credit cards is invalid');
            }
        }
    },
    dtiRatio: {
        type: Number,
        required: [true, 'DTI is essential']
    }
});


const Client = mongoose.model('Client', clientSchema);
class ClientModel {
    static async createClient(clientData) {
        try {
            return await Client.create(clientData);
        } catch (error) {
            throw new Error('Error creating client: ' + error.message);
        }
    }

    static async getClientById(clientId) {
        try {
            return await Client.findById(clientId);
        } catch (error) {
            throw new Error('Error fetching client: ' + error.message);
        }
    }

    static async getAllClients() {
        try {
            return await Client.find();
        } catch (error) {
            throw new Error('Error fetching clients: ' + error.message);
        }
    }

    static async updateClient(clientId, updatedClientData) {
        try {
            return await Client.findByIdAndUpdate(clientId, updatedClientData, { new: true });
        } catch (error) {
            throw new Error('Error updating client: ' + error.message);
        }
    }

    static async deleteClient(clientId) {
        try {
            return await Client.findByIdAndDelete(clientId);
        } catch (error) {
            throw new Error('Error deleting client: ' + error.message);
        }
    }
}

module.exports = ClientModel;
