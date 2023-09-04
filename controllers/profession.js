const Profession = require('../models/profession');


module.exports.professions = async (req, res) => {
    try {

        const professions = await Profession.find({});

        res.status(200).json({
            success: true,
            message: 'Profession retrieved successfully',
            professions
        });
    } catch (error) {
        console.error('Error retrieving profession:', error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}