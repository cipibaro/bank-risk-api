const Client = require('../models/client');
const EmploymentIndustry = require('../models/employmentIndustry');
const Profession = require('../models/profession');
const CreditRating = require('../models/creditRating');
const {isValidOperation, filterData} = require('../services/Util');


const CreditRatingSystem = require('../roughset/CreditRatingSystem');
const mongoose = require('mongoose');

const MIN_INCOME = 1900;
const MIN_CREDIT_SCORE = 600;
const MAX_DEBT_PERCENTAGE = 40;

/**
 * Gets all the clients from database
 * @param req
 * @param res
 * @param next
 */
exports.getClients = async (req, res, next) => {
    try {
        const clients = await Client.getAllClients();
        res.status(200).json({
            success: true,
            message: 'Clients found',
            clients
        });
    } catch (error) {
        console.error('Error finding client:', error);
        // Send an error response with status code 500 (Internal Server Error)
        res.status(404).json({success: false, message: 'Error 404', error: error.message});
    }
}

/**
 * Gets one client by ID
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getClientById = async (req, res, next) => {
    try {
        const client = await Client.getClientById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Client found',
            client
        });
    } catch (error) {
        console.error('Error finding client:', error);
        res.status(404).json({success: false, message: 'Error 404', error: error.message});
    }
};

/**
 * Add client
 * @param req
 * @param res
 * @param next
 */
exports.postClients = async (req, res, next) => {
    try {
        const employmentPts = await EmploymentIndustry.findOne({name: req.body.employmentIndustry});
        const professionPts = await Profession.findOne({name: req.body.profession});

        const clientObj = {
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            cnp: req.body.cnp,
            sex: req.body.sex,
            placeOfBirth: req.body.placeOfBirth,
            countyOfBirth: req.body.countyOfBirth,
            dateOfBirth: req.body.dateOfBirth,
            series: req.body.series,
            seriesNumber: req.body.seriesNumber,
            studies: req.body.studies,
            age: req.body.age,
            nationality: req.body.nationality,
            politicalExposure: req.body.politicalExposure,
            ownsCar: req.body.ownsCar,
            dependents: req.body.dependents,
            relationshipStatus: req.body.relationshipStatus,
            relationshipAge: req.body.relationshipAge,
            income: req.body.income,
            lengthOfEmployment: req.body.lengthOfEmployment,
            outstandingDebt: req.body.outstandingDebt,
            occupation: req.body.occupation,
            typeOfIncome: req.body.typeOfIncome,
            employmentIndustry: employmentPts._id,
            profession: professionPts._id,
            creditHistory: req.body.creditHistory,
            paymentHistory: req.body.paymentHistory,
            existingCreditAccounts: req.body.existingCreditAccounts,
        }

        clientObj.employmentPts = employmentPts.score;
        clientObj.professionPts = professionPts.score;
        clientObj.dtiRatio = clientObj.outstandingDebt / clientObj.income;


        const creditRatingSystem = new CreditRatingSystem();
        const totalCreditScore = creditRatingSystem.evaluateCredit(clientObj);
        const creditRating = creditRatingSystem.getCreditRating(clientObj, MIN_INCOME, MIN_CREDIT_SCORE, MAX_DEBT_PERCENTAGE);


        const newClient = await Client.createClient(clientObj);

        const newCreditRating = new CreditRating({
            _id: new mongoose.Types.ObjectId(),
            client_id: clientObj._id,
            totalCreditScore: totalCreditScore,
            creditRating: creditRating,
        });

        // Save the new credit rating
        await newCreditRating.createCreditRating();

        res.status(201).json({
            success: true,
            message: 'Client created successfully',
            client: newClient,
            clientRating: newCreditRating
        });
    } catch (error) {
        console.error('Error creating client:', error);
        // Send an error response with status code 500 (Internal Server Error)
        res.status(500).json({success: false, message: 'Error creating client', error: error.message});
    }
}

/**
 * Edit one client
 * @param req
 * @param res
 * @param next
 */
exports.patchClients = async (req, res, next) => {
    try {

        const updates = Object.keys(req.body);
        const allowedUpdates = ['firstName',
            'lastName',
            'cnp',
            'sex',
            'placeOfBirth',
            'countyOfBirth',
            'dateOfBirth',
            'series',
            'seriesNumber',
            'studies',
            'age',
            'nationality',
            'politicalExposure',
            'ownsCar',
            'dependents',
            'relationshipStatus',
            'relationshipAge',
            'income',
            'lengthOfEmployment',
            'outstandingDeb',
            'occupation',
            'typeOfIncome',
            'employmentIndustry',
            'profession',
            'creditHistory',
            'paymentHistory',
            'existingCreditAccounts'];

        if (!isValidOperation(updates, allowedUpdates)) {
            return res.status(400).send('Invalid updates');
        }
        const client = await Client.updateClient({_id: req.params.id}, {$set: req.body});


        res.status(201).json({
            success: true,
            message: 'Client updated successfully',
            client
        });
    } catch (error) {
        console.error('Error updating client:', error);
        // Send an error response with status code 500 (Internal Server Error)
        res.status(500).json({success: false, message: 'Error updating client', error: error.message});
    }
}



