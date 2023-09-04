const EmploymentIndustry = require('../models/employmentIndustry');


module.exports.industries = async (req, res) => {
    try {

        const industries = await EmploymentIndustry.find({});

        res.status(200).json({
            success: true,
            message: 'Industries retrieved successfully',
            industries
        });
    } catch (error) {
        console.error('Error retrieving industries:', error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}