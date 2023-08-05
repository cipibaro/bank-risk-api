const Client = require('../models/client');

const ActivitySector = require('../models/activitySector')
const Profession = require('../models/profession')
const Risk = require('../controllers/risk');

const mongoose = require('mongoose');

/**
 * Gets all the clients from database
 * @param req
 * @param res
 * @param next
 */
exports.getClients = (req, res, next) => {
    res.status(200).send('sadasdas');
}


/**
 * Add client
 * @param req
 * @param res
 * @param next
 */
exports.postClients = async (req, res, next) => {


    const activitySector = await ActivitySector.findOne({name: req.body.activitySector});
    const profession = await Profession.findOne({name: req.body.profession})
    const client = new Client({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cnp: req.body.cnp,
        sex: req.body.sex,
        pob: req.body.pob,
        countryOfb: req.body.countryOfb,
        dateOfBirth: req.body.dateOfBirth,
        ci: req.body.ci,
        nr: req.body.nr,
        studies: req.body.studies,
        age: req.body.age,
        nationality: req.body.nationality,
        politicalExposure: req.body.politicalExposure,
        carOwner: req.body.carOwner,
        peopleInCare: req.body.peopleInCare,
        relationshipStatus: req.body.relationshipStatus,
        relationshipAge: req.body.relationshipAge,
        income: req.body.income,
        yearsOfWork: req.body.yearsOfWork,
        debt: req.body.debt,
        occupation: req.body.occupation,
        typeOfIncome: req.body.typeOfIncome,
        activitySector: activitySector._id,
        profession: profession._id,
        dateOfHiring: req.body.dateOfHiring,
    });

    let score = Risk.score(client);
    score += activitySector.score;
    score += profession.score;

    console.log("Rating from activity sector: " + activitySector.score);
    console.log("Rating from profession: " + profession.score);

    /*client.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));*/

    console.log("total score: " + score);

    const DTI = Risk.debtToIncomeRatio(client.debt, client.income);

    console.log("DTI: " + DTI);
    console.log(Risk.evaluateRisk(score, DTI));
    res.status(201).json({
        message: 'Client create Successfully',
        totalScore: score
    });
}

/**
 * Edit one client
 * @param req
 * @param res
 * @param next
 */
exports.patchClients = (req, res, next) => {
    const id = req.params.id


    res.status(201).json({
        message: 'Client updated Successfully',

    });
}

/**
 * Delete one client
 * @param req
 * @param res
 * @param next
 */
exports.deleteClients = (req, res, next) => {
    res.status(201).json({
        message: 'Client delete Successfully'
    });
}


