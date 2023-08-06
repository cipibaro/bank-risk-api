const mongoose = require('mongoose');

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
        enum: ["Foarte bun platnic", "Bun platnic", "Rau platnic"],
        required: true
    },
    existingCreditAccounts: {
        type: Number,
        required: true
    },
    dtiRatio: {
        type: Number,
        required: true
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
