const mongoose = require('mongoose');

const Client = require('../models/client');
const CreditRating = require('../models/creditRating');
const CreditRatingSystem = require('../roughset/CreditRatingSystem');


function calculateRatingAndPoints(client) {
    let status = {};

    const creditRatingSystem = new CreditRatingSystem();

    status.totalCreditScore = creditRatingSystem.evaluateCredit(client);
    status.creditRating = creditRatingSystem.getCreditRating(client);

    return status;
}

module.exports.clientRatings = async (req, res) => {
    try {
        const filters = req.query; // Get query parameters as an object

        const aggregationPipeline = [
            // Perform a left outer join with the CreditRating collection
            {
                $lookup: {
                    from: 'client-credit-ratings', // Use consistent naming
                    localField: '_id',
                    foreignField: 'client_id',
                    as: 'creditRatingData',
                },
            },
            // Unwind the joined array, preserving null and empty arrays
            {
                $unwind: {
                    path: '$creditRatingData',
                    preserveNullAndEmptyArrays: true,
                },
            },
            // Project the desired fields for the response
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    cnp: 1,
                    // ... Include other fields you need
                    totalCreditScore: '$creditRatingData.totalCreditScore',
                    creditRating: '$creditRatingData.creditRating',
                },
            },
            // Apply the dynamic match criteria
        ];

        // Build the match criteria dynamically based on query parameters
        const matchCriteria = {};
        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                if (key === 'age') {
                    matchCriteria[key] = parseInt(filters[key]);
                } else if (key === 'totalCreditScore') {
                    matchCriteria[key] = parseInt(filters[key]);
                } else {
                    matchCriteria[key] = filters[key];
                }
            }
        }

        // Add the matchCriteria to the aggregation pipeline
        if (Object.keys(matchCriteria).length > 0) {
            aggregationPipeline.push({
                $match: matchCriteria,
            });
        }

        const clientsWithCreditRating = await Client.aggregate(aggregationPipeline);

        res.status(200).json({
            success: true,
            message: 'Clients with credit rating retrieved successfully',
            clients: clientsWithCreditRating,
        });
    } catch (error) {
        console.error('Error retrieving clients with credit rating:', error);
        res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
    }
};

module.exports.createClientStatus = function (client) {

    const status = calculateRatingAndPoints(client);

    const clientStatus = new CreditRating({
        _id: new mongoose.Types.ObjectId(),
        client_id: client._id,
        totalCreditScore: status.totalCreditScore,
        creditRating: status.creditRating
    });

    return clientStatus.save();
}

module.exports.updatedClientStatus = function (client, id) {
    return CreditRating.findOneAndUpdate(
        {client_id: id},
        calculateRatingAndPoints(client),
        {new: true}
    );
}

module.exports.deleteCientStatus = function (ids) {
    CreditRating.deleteMany({client_id: {$in: ids}});
}