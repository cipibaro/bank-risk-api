const Client = require('../models/client');
const EmploymentIndustry = require('../models/employmentIndustry');
const Profession = require('../models/profession');
const CreditRatingController = require('./creditRating');

const {isValidOperation, filterData} = require('../services/Util');



const mongoose = require('mongoose');


/*const MIN_INCOME = 1900;
const MIN_CREDIT_SCORE = 600;
const MAX_DEBT_PERCENTAGE = 40;*/

/**
 * Gets all the clients from database
 * @param req
 * @param res
 * @param next
 */
module.exports.getClients = async (req, res) => {
    try {
        const filters = req.query; // Get all query parameters as an object

        // Build the filter object based on query parameters
        const filterObj = {};
        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                if (key === 'age') {
                    filterObj[key] = parseInt(filters[key]);
                } else {
                    filterObj[key] = filters[key];
                }
            }
        }

        let clients;
        if (Object.keys(filterObj).length === 0) {
            // No filter supplied, return all clients
            clients = await Client.find();
        } else {
            // Find clients based on the filter object
            clients = await Client.find(filterObj);
        }

        res.status(200).json({
            success: true,
            message: 'Clients retrieved successfully',
            clients
        });
    } catch (error) {
        console.error('Error retrieving clients:', error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}


/**
 * Add client
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.create = async (req, res) => {
    try {
        const client = await buildAndSaveClientObject(req.body);
        const clientStatus = await CreditRatingController.createClientStatus(client);

        res.status(201).json({
            success: true,
            message: "Client saved!",
            client,
            clientStatus
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


/**
 * Edit client
 * @param req
 * @param res
 */
module.exports.update = async (req, res) => {
    try {
        const clientToUpdate = await Client.findById(req.params.id);

        if (!clientToUpdate) {
            return res.status(404).send('Client not found');
        }

        console.log(clientToUpdate);

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
            'outstandingDebt',
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

        // Prepare the updated fields object
        const updatedFields = {};
        updates.forEach((update) => {
            updatedFields[update] = req.body[update];
        });


        const employmentUpdates = updates.includes('employmentIndustry');
        const professionUpdates = updates.includes('profession');

        let employmentIndustry = {};
        let profession = {};

        if (updates.includes('income') && updates.includes('outstandingDebt')) {
            updatedFields['dtiRatio'] = req.body.outstandingDebt / req.body.income;
        } else if (updates.includes('income')) {
            updatedFields['dtiRatio'] = clientToUpdate.outstandingDebt / req.body.income;
        } else if (updates.includes('outstandingDebt')) {
            updatedFields['dtiRatio'] = req.body.outstandingDebt / clientToUpdate.income;
        }

        if (employmentUpdates) {
            employmentIndustry = await EmploymentIndustry.findOne({name: req.body.employmentIndustry});
            updatedFields['employmentIndustry'] = employmentIndustry._id;
        }

        if (professionUpdates) {
            profession = await Profession.findOne({name: req.body.profession});
            updatedFields['profession'] = profession._id;
        }


        // Update the Client document and return the updated document
        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            {new: true}
        );

        const employmentPts = employmentUpdates ? employmentIndustry.score : (await EmploymentIndustry.findById(updatedClient.employmentIndustry)).score;
        const professionPts = professionUpdates ? profession.score : (await Profession.findById(updatedClient.profession)).score;

        updatedClient.employmentPts = employmentPts;
        updatedClient.professionPts = professionPts;


        const updatedStatus = await CreditRatingController.updatedClientStatus(updatedClient, req.params.id);

        if (!updatedStatus) {
            return res.status(404).json({success: false, message: 'Credit rating entry not found'});
        }

        res.status(201).json({
            success: true,
            message: 'Client updated successfully',
            updatedClient,
            updatedStatus
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


/**
 * Delete client
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.delete = async (req, res) => {
    const clientIds = req.body.clientIds || [req.params.id]; // Use array from request body or single ID from params

    try {
        // Check if any clients exist in the provided IDs
        const existingClients = await Client.find({_id: {$in: clientIds}});

        if (existingClients.length !== clientIds.length) {
            const missingClientIds = clientIds.filter(id => !existingClients.find(client => client._id.toString() === id));
            return res.status(404).json({success: false, message: 'Some clients not found', missingClientIds});
        }

        // Delete credit ratings for the clients*
        await CreditRatingController.deleteCientStatus({client_id: {$in: clientIds}});
        // Delete the clients
        await Client.deleteMany({_id: {$in: clientIds}});

        res.status(200).json({success: true, message: 'Clients deleted successfully'});
    } catch (error) {
        console.error('Error deleting clients:', error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

/*
Helper functions
 */
async function getEmploymentIndustryByName(name) {
    return EmploymentIndustry.findOne({name: name});
}

async function getProfessionByName(name) {
    return Profession.findOne({name: name});
}

async function buildAndSaveClientObject(data) {
    let client = new Client(data);
    client._id = new mongoose.Types.ObjectId();
    const employmentIndustry = await getEmploymentIndustryByName(data.employmentIndustry);
    const profession = await getProfessionByName(data.profession);

    client.employmentIndustry = employmentIndustry._id;
    client.profession = profession._id;

    client.employmentPts = employmentIndustry.score;
    client.professionPts = profession.score;
    client.dtiRatio = data.outstandingDebt / data.income;

    return client.save(); // Return the saved client instance
}
